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
import type { Folder } from "./types";
import { useUserId } from "./use-user-id";
import { createClient } from "@/utils/supabase/client";

interface FolderContextValue {
  folders: Folder[];
  isAdding: boolean;
  isRenaming: boolean;
  isRemoving: boolean;
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
}

const FolderContext = createContext<FolderContextValue | null>(null);

// 사이드바 상단에 항상 노출되는 가상 폴더. DB에는 저장되지 않는다.
const ALL_FOLDER: Folder = { id: "all", name: "전체", count: 0 };

interface FolderProviderProps {
  children: ReactNode;
}

export function FolderProvider({ children }: FolderProviderProps) {
  const supabase = useMemo(() => createClient(), []);
  const userId = useUserId();
  const [folders, setFolders] = useState<Folder[]>([ALL_FOLDER]);

  // 현재 로그인된 사용자의 폴더만 불러온다.
  // 계정이 바뀌면(userId 변경) 다시 불러오고, 로그아웃 시 목록을 비운다.
  useEffect(() => {
    let active = true;

    void (async () => {
      if (!userId) {
        if (active) setFolders([ALL_FOLDER]);
        return;
      }

      const { data, error } = await supabase
        .from("folders")
        .select("id, name")
        .eq("user_id", userId)
        .order("id", { ascending: true });

      if (!active || error || !data) return;

      setFolders([
        ALL_FOLDER,
        ...data.map((row) => ({
          id: String(row.id),
          name: row.name as string,
          count: 0,
        })),
      ]);
    })();

    return () => {
      active = false;
    };
  }, [supabase, userId]);

  // 중복 클릭으로 폴더가 여러 개 추가되는 것을 막는 플래그.
  const addingRef = useRef(false);
  const [isAdding, setIsAdding] = useState(false);

  const addFolder = useCallback(
    async (name: string) => {
      if (addingRef.current) return;
      addingRef.current = true;
      setIsAdding(true);

      try {
        const { data, error } = await supabase
          .from("folders")
          .insert({ name })
          .select("id, name")
          .single();

        if (error || !data) {
          console.error("폴더 추가 실패:", error?.message);
          return;
        }

        setFolders((prev) => [
          ...prev,
          { id: String(data.id), name: data.name as string, count: 0 },
        ]);
      } finally {
        addingRef.current = false;
        setIsAdding(false);
      }
    },
    [supabase],
  );

  // 중복 클릭으로 delete 요청이 여러 번 나가는 것을 막는 플래그.
  const removingRef = useRef(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const removeFolder = useCallback(
    async (id: string) => {
      if (removingRef.current) return;
      removingRef.current = true;
      setIsRemoving(true);

      try {
        const { error } = await supabase
          .from("folders")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("폴더 삭제 실패:", error.message);
          return;
        }

        setFolders((prev) => prev.filter((folder) => folder.id !== id));
      } finally {
        removingRef.current = false;
        setIsRemoving(false);
      }
    },
    [supabase],
  );

  // 중복 저장으로 update 요청이 여러 번 나가는 것을 막는 플래그.
  const renamingRef = useRef(false);
  const [isRenaming, setIsRenaming] = useState(false);

  const renameFolder = useCallback(
    async (id: string, name: string) => {
      if (renamingRef.current) return;
      renamingRef.current = true;
      setIsRenaming(true);

      try {
        const { data, error } = await supabase
          .from("folders")
          .update({ name })
          .eq("id", id)
          .select("id, name")
          .single();

        if (error || !data) {
          console.error("폴더 이름 수정 실패:", error?.message);
          return;
        }

        setFolders((prev) =>
          prev.map((folder) =>
            folder.id === id
              ? { ...folder, name: data.name as string }
              : folder,
          ),
        );
      } finally {
        renamingRef.current = false;
        setIsRenaming(false);
      }
    },
    [supabase],
  );

  return (
    <FolderContext.Provider
      value={{
        folders,
        isAdding,
        isRenaming,
        isRemoving,
        addFolder,
        removeFolder,
        renameFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
