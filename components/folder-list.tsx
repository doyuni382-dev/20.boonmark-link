"use client";

import { useState } from "react";
import Link from "next/link";
import type { Folder } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/folder-context";
import { DeleteFolderModal } from "./delete-folder-modal";
import { EditFolderModal } from "./edit-folder-modal";

interface FolderListProps {
  folders: Folder[];
}

export function FolderList({ folders }: FolderListProps) {
  const { removeFolder, renameFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);

  return (
    <nav aria-label="폴더 목록" className="mt-6">
      <p className="px-3 text-sm font-semibold tracking-wide text-[var(--text-sub)] uppercase">
        폴더
      </p>
      <ul className="mt-2 flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id} className="group relative">
            <Link
              href={`/folder/${folder.id}`}
              className="list-hover flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base text-[var(--text)]"
            >
              <span className="truncate">{folder.name}</span>
              <span className="text-sm text-[var(--text-sub)] group-hover:hidden">
                {folder.count}
              </span>
            </Link>
            {folder.id !== "all" && (
              <div className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-0.5 group-hover:flex">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFolderToEdit(folder);
                  }}
                  aria-label={`${folder.name} 폴더 이름 수정`}
                  className="rounded-md p-1.5 text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--accent)]"
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
                    <path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="M15 5l4 4" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFolderToDelete(folder);
                  }}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className="rounded-md p-1.5 text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--error)]"
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
              </div>
            )}
          </li>
        ))}
      </ul>
      {folderToEdit && (
        <EditFolderModal
          folder={folderToEdit}
          onClose={() => setFolderToEdit(null)}
          onSave={(name) => renameFolder(folderToEdit.id, name)}
        />
      )}
      {folderToDelete && (
        <DeleteFolderModal
          folder={folderToDelete}
          onCancel={() => setFolderToDelete(null)}
          onConfirm={() => {
            removeFolder(folderToDelete.id);
            setFolderToDelete(null);
          }}
        />
      )}
    </nav>
  );
}
