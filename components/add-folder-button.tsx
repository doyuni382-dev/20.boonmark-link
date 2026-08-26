"use client";

import { useState } from "react";
import { FolderModal } from "./folder-modal";

export function AddFolderButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="list-hover flex h-9 items-center gap-1.5 rounded-md border border-[var(--border)] px-4 text-base font-medium text-[var(--text)]"
      >
        <span aria-hidden>+</span>
        새 폴더
      </button>
      {isOpen && <FolderModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
