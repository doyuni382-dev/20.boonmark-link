import { notFound } from "next/navigation";
import { BookmarkGrid } from "@/components/bookmark-grid";
import { getBookmarksByFolder, getFolderById } from "../../_lib/mock-data";

export default async function FolderPage(
  props: PageProps<"/folder/[folderId]">,
) {
  const { folderId } = await props.params;
  const folder = getFolderById(folderId);

  if (!folder) {
    notFound();
  }

  const bookmarks = getBookmarksByFolder(folderId);

  return (
    <div className="flex flex-col gap-1">
      <h1 className="px-6 pt-10 text-3xl font-bold leading-tight text-[var(--text)]">
        {folder.name}
      </h1>
      <BookmarkGrid bookmarks={bookmarks} />
    </div>
  );
}
