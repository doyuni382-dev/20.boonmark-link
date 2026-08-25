import { BookmarkGrid } from "@/components/bookmark-grid";
import { mockBookmarks } from "./_lib/mock-data";

export default function Home() {
  return <BookmarkGrid bookmarks={mockBookmarks} />;
}
