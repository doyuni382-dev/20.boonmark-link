"use client";

import { useFolders } from "@/app/_lib/folder-context";
import { FolderList } from "./folder-list";

export function Sidebar() {
  const { folders } = useFolders();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-[var(--border)] bg-[var(--bg)] px-3 py-4 sm:block">
      <FolderList folders={folders} />
    </aside>
  );
}
