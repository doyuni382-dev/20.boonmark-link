import type { Bookmark } from "@/app/_lib/types";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border border-black/[.08] bg-white p-4 transition-colors hover:border-black/[.15] dark:border-white/[.08] dark:bg-zinc-950 dark:hover:border-white/[.2]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {bookmark.title.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {bookmark.title}
          </p>
          <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
            {bookmark.url}
          </p>
        </div>
      </div>
      {bookmark.description ? (
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {bookmark.description}
        </p>
      ) : null}
    </a>
  );
}
