import Link from "next/link";
import type { Folder } from "@/app/_lib/types";

interface FolderListProps {
  folders: Folder[];
}

export function FolderList({ folders }: FolderListProps) {
  return (
    <nav aria-label="폴더 목록" className="mt-6">
      <p className="px-3 text-sm font-semibold tracking-wide text-[var(--text-sub)] uppercase">
        폴더
      </p>
      <ul className="mt-2 flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className="list-hover flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base text-[var(--text)]"
            >
              <span className="truncate">{folder.name}</span>
              <span className="text-sm text-[var(--text-sub)]">
                {folder.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
