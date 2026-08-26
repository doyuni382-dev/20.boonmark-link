"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { Bookmark } from "./types";
import { useLocalStorageState } from "./use-local-storage-state";

interface BookmarkContextValue {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id">) => void;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

interface BookmarkProviderProps {
  initialBookmarks: Bookmark[];
  children: ReactNode;
}

export function BookmarkProvider({
  initialBookmarks,
  children,
}: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useLocalStorageState<Bookmark[]>(
    "boonmark-link:bookmarks",
    initialBookmarks,
  );

  const addBookmark = useCallback(
    (bookmark: Omit<Bookmark, "id">) => {
      setBookmarks((prev) => [
        { id: `bookmark-${Date.now()}`, ...bookmark },
        ...prev,
      ]);
    },
    [setBookmarks],
  );

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
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
