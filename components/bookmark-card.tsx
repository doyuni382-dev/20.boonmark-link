"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_lib/types";
import { useBookmarks } from "@/app/_lib/bookmark-context";
import { DeleteBookmarkModal } from "./delete-bookmark-modal";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { removeBookmark } = useBookmarks();
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const showThumbnail = Boolean(bookmark.thumbnail) && !thumbnailFailed;

  return (
    <div className="group relative">
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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDeleteModalOpen(true);
        }}
        aria-label={`${bookmark.title} 링크 삭제`}
        className="absolute top-2 right-2 hidden rounded-md bg-[var(--surface)]/90 p-1.5 text-[var(--text-sub)] group-hover:flex hover:bg-[var(--hover-bg)] hover:text-[var(--error)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden
        >
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
      {isDeleteModalOpen && (
        <DeleteBookmarkModal
          bookmark={bookmark}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            removeBookmark(bookmark.id);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
