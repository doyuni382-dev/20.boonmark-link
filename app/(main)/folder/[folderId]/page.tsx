"use client";

import { useParams } from "next/navigation";
import { BookmarkGrid } from "@/components/bookmark-grid";
import { useBookmarks } from "@/app/_lib/bookmark-context";
import { useFolders } from "@/app/_lib/folder-context";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders } = useFolders();
  const { bookmarks } = useBookmarks();

  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 pt-16 text-center">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          폴더를 찾을 수 없습니다
        </h1>
        <p className="text-base text-[var(--text-sub)]">
          삭제되었거나 존재하지 않는 폴더예요.
        </p>
      </div>
    );
  }

  const folderBookmarks =
    folderId === "all"
      ? bookmarks
      : bookmarks.filter((bookmark) => bookmark.folderId === folderId);

  return (
    <div className="flex flex-col gap-1">
      <h1 className="px-6 pt-10 text-3xl font-bold leading-tight text-[var(--text)]">
        {folder.name}
      </h1>
      <BookmarkGrid bookmarks={folderBookmarks} />
    </div>
  );
}
