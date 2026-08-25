import Link from "next/link";
import type { Folder } from "@/app/_lib/types";

interface FolderListProps {
  folders: Folder[];
}

export function FolderList({ folders }: FolderListProps) {
  return (
    <nav aria-label="폴더 목록" className="mt-6">
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
        폴더
      </p>
      <ul className="mt-2 flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              <span className="truncate">{folder.name}</span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {folder.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
