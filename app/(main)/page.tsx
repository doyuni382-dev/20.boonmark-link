"use client";

import { BookmarkGrid } from "@/components/bookmark-grid";
import { useBookmarks } from "@/app/_lib/bookmark-context";

export default function Home() {
  const { bookmarks } = useBookmarks();

  return <BookmarkGrid bookmarks={bookmarks} />;
}
