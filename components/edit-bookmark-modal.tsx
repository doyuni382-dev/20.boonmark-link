"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import type { Bookmark } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/folder-context";

interface EditBookmarkModalProps {
  bookmark: Bookmark;
  onClose: () => void;
  onSave: (updates: {
    folderId: string;
    title: string;
    description: string;
  }) => void;
}

export function EditBookmarkModal({
  bookmark,
  onClose,
  onSave,
}: EditBookmarkModalProps) {
  const { folders } = useFolders();
  const saveableFolders = folders.filter((folder) => folder.id !== "all");

  const [folderId, setFolderId] = useState(bookmark.folderId);
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description ?? "");

  function handleSave() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !folderId) return;
    onSave({
      folderId,
      title: trimmedTitle,
      description: description.trim(),
    });
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg bg-[var(--surface)] p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          링크 수정
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-bookmark-folder"
            className="text-base font-medium text-[var(--text)]"
          >
            폴더
          </label>
          <select
            id="edit-bookmark-folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            required
            className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)]"
          >
            {saveableFolders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-bookmark-title"
            className="text-base font-medium text-[var(--text)]"
          >
            제목
          </label>
          <input
            id="edit-bookmark-title"
            type="text"
            autoFocus
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="링크 제목을 입력하세요"
            className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-bookmark-description"
            className="text-base font-medium text-[var(--text)]"
          >
            설명
          </label>
          <textarea
            id="edit-bookmark-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="링크에 대한 설명을 입력하세요"
            rows={3}
            className="input-field resize-none rounded-md bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
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
            disabled={!title.trim()}
            className="btn-primary flex h-10 items-center justify-center rounded-md px-4 text-base font-medium"
          >
            저장
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
