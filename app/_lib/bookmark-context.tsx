"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Bookmark } from "./types";
import { createClient } from "@/utils/supabase/client";

type BookmarkUpdate = Partial<
  Pick<Bookmark, "folderId" | "title" | "description">
>;

interface BookmarkContextValue {
  bookmarks: Bookmark[];
  isAdding: boolean;
  isUpdating: boolean;
  isRemoving: boolean;
  addBookmark: (bookmark: Omit<Bookmark, "id">) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  updateBookmark: (id: string, updates: BookmarkUpdate) => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

// title 컬럼이 비어 있는 링크는 URL의 호스트명을 제목으로 대신 사용한다.
function deriveTitle(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

interface LinkRow {
  id: number | string;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | string | null;
}

function rowToBookmark(row: LinkRow): Bookmark {
  const title = row.title?.trim();
  return {
    id: String(row.id),
    folderId: row.folder_id == null ? "" : String(row.folder_id),
    title: title ? title : deriveTitle(row.url),
    url: row.url,
    description: row.description ?? "",
    thumbnail: row.thumbnail_url,
  };
}

interface BookmarkProviderProps {
  children: ReactNode;
}

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const supabase = useMemo(() => createClient(), []);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // 마운트 시 links 테이블에 저장된 링크를 최신순으로 불러온다.
  useEffect(() => {
    let active = true;

    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (!active || error || !data) return;
        setBookmarks((data as LinkRow[]).map(rowToBookmark));
      });

    return () => {
      active = false;
    };
  }, [supabase]);

  // 저장 버튼 중복 클릭으로 링크가 여러 번 추가되는 것을 막는 플래그.
  const addingRef = useRef(false);
  const [isAdding, setIsAdding] = useState(false);

  const addBookmark = useCallback(
    async (bookmark: Omit<Bookmark, "id">) => {
      if (addingRef.current) return;
      addingRef.current = true;
      setIsAdding(true);

      try {
        const { data, error } = await supabase
          .from("links")
          .insert({
            url: bookmark.url,
            title: bookmark.title?.trim() ? bookmark.title.trim() : null,
            description: bookmark.description ?? null,
            thumbnail_url: bookmark.thumbnail ?? null,
            folder_id: bookmark.folderId ? Number(bookmark.folderId) : null,
          })
          .select("id, url, title, description, thumbnail_url, folder_id")
          .single();

        if (error || !data) {
          throw new Error(error?.message ?? "링크를 저장하지 못했습니다.");
        }

        setBookmarks((prev) => [rowToBookmark(data as LinkRow), ...prev]);
      } finally {
        addingRef.current = false;
        setIsAdding(false);
      }
    },
    [supabase],
  );

  // 삭제 버튼 중복 클릭으로 delete 요청이 여러 번 나가는 것을 막는 플래그.
  const removingRef = useRef(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const removeBookmark = useCallback(
    async (id: string) => {
      if (removingRef.current) return;
      removingRef.current = true;
      setIsRemoving(true);

      try {
        const { error } = await supabase.from("links").delete().eq("id", id);

        if (error) {
          console.error("링크 삭제 실패:", error.message);
          return;
        }

        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
      } finally {
        removingRef.current = false;
        setIsRemoving(false);
      }
    },
    [supabase],
  );

  // 저장 버튼 중복 클릭으로 update 요청이 여러 번 나가는 것을 막는 플래그.
  const updatingRef = useRef(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateBookmark = useCallback(
    async (id: string, updates: BookmarkUpdate) => {
      if (updatingRef.current) return;
      updatingRef.current = true;
      setIsUpdating(true);

      try {
        const patch: Record<string, unknown> = {};
        if (updates.title !== undefined) {
          patch.title = updates.title.trim() || null;
        }
        if (updates.description !== undefined) {
          patch.description = updates.description || null;
        }
        if (updates.folderId !== undefined) {
          patch.folder_id = updates.folderId ? Number(updates.folderId) : null;
        }

        if (Object.keys(patch).length > 0) {
          const { error } = await supabase
            .from("links")
            .update(patch)
            .eq("id", id);

          if (error) {
            console.error("링크 수정 실패:", error.message);
            return;
          }
        }

        setBookmarks((prev) =>
          prev.map((bookmark) =>
            bookmark.id === id ? { ...bookmark, ...updates } : bookmark,
          ),
        );
      } finally {
        updatingRef.current = false;
        setIsUpdating(false);
      }
    },
    [supabase],
  );

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isAdding,
        isUpdating,
        isRemoving,
        addBookmark,
        removeBookmark,
        updateBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
