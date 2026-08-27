"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useFolders } from "@/app/_lib/folder-context";

interface FolderModalProps {
  onClose: () => void;
}

export function FolderModal({ onClose }: FolderModalProps) {
  const { addFolder, isAdding } = useFolders();
  const [name, setName] = useState("");

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed || isAdding) return;
    await addFolder(trimmed);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg bg-[var(--surface)] p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-[var(--text)]">새 폴더</h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="folder-name"
            className="text-base font-medium text-[var(--text)]"
          >
            폴더 이름
          </label>
          <input
            id="folder-name"
            name="folder-name"
            type="text"
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="list-hover flex h-10 items-center justify-center rounded-md border border-[var(--border)] px-4 text-base font-medium text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim() || isAdding}
            className="btn-primary flex h-10 items-center justify-center rounded-md px-4 text-base font-medium"
          >
            {isAdding ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
