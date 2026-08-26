"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_lib/types";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const showThumbnail = Boolean(bookmark.thumbnail) && !thumbnailFailed;

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-3 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      {showThumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element -- 외부 임의 도메인 썸네일이라 next/image remotePatterns로 사전 등록이 불가능함
        <img
          src={`/api/thumbnail?url=${encodeURIComponent(bookmark.thumbnail as string)}`}
          alt=""
          onError={() => setThumbnailFailed(true)}
          className="-mx-4 -mt-4 h-32 w-[calc(100%+2rem)] object-cover"
        />
      ) : null}
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
