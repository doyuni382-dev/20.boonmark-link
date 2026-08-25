import type { Bookmark } from "@/app/_lib/types";
import { BookmarkCard } from "./bookmark-card";

interface BookmarkGridProps {
  bookmarks: Bookmark[];
}

export function BookmarkGrid({ bookmarks }: BookmarkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
