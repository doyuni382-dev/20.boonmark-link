"use client";

import { createPortal } from "react-dom";
import type { Folder } from "@/app/_lib/types";

interface DeleteFolderModalProps {
  folder: Folder;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteFolderModal({
  folder,
  onCancel,
  onConfirm,
}: DeleteFolderModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg bg-[var(--surface)] p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          폴더 삭제
        </h2>
        <p className="text-base text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">
            &apos;{folder.name}&apos;
          </span>{" "}
          폴더를 삭제하시겠습니까?
          <br />
          삭제한 폴더는 되돌릴 수 없습니다.
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
            className="flex h-10 items-center justify-center rounded-md bg-[var(--error)] px-4 text-base font-medium text-white hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
