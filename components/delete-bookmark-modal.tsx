"use client";

import { createPortal } from "react-dom";
import type { Bookmark } from "@/app/_lib/types";
import { useBookmarks } from "@/app/_lib/bookmark-context";

interface DeleteBookmarkModalProps {
  bookmark: Bookmark;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteBookmarkModal({
  bookmark,
  onCancel,
  onConfirm,
}: DeleteBookmarkModalProps) {
  const { isRemoving } = useBookmarks();

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg bg-[var(--surface)] p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          링크 삭제
        </h2>
        <p className="text-base text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">
            &apos;{bookmark.title}&apos;
          </span>{" "}
          링크를 삭제하시겠습니까?
          <br />
          삭제한 링크는 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="list-hover flex h-10 items-center justify-center rounded-md border border-[var(--border)] px-4 text-base font-medium text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isRemoving}
            className="flex h-10 items-center justify-center rounded-md bg-[var(--error)] px-4 text-base font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            {isRemoving ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
