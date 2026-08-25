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
      className="card-hover flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--hover-bg)] text-base font-semibold text-[var(--text)]">
          {bookmark.title.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-medium text-[var(--text)]">
            {bookmark.title}
          </p>
          <p className="truncate text-sm text-[var(--text-sub)]">
            {bookmark.url}
          </p>
        </div>
      </div>
      {bookmark.description ? (
        <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
          {bookmark.description}
        </p>
      ) : null}
    </a>
  );
}
