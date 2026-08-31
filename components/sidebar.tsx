"use client";

import { useBookmarks } from "@/app/_lib/bookmark-context";
import { useFolders } from "@/app/_lib/folder-context";
import { FolderList } from "./folder-list";
import { LogoutButton } from "./logout-button";

export function Sidebar() {
  const { folders } = useFolders();
  const { bookmarks } = useBookmarks();

  const foldersWithCount = folders.map((folder) => ({
    ...folder,
    count:
      folder.id === "all"
        ? bookmarks.length
        : bookmarks.filter((bookmark) => bookmark.folderId === folder.id)
            .length,
  }));

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg)] px-3 py-4 sm:flex">
      <div className="flex-1">
        <FolderList folders={foldersWithCount} />
      </div>
      <LogoutButton />
    </aside>
  );
}
