import type { Folder } from "@/app/_lib/types";

interface FolderSelectProps {
  folders: Folder[];
}

export function FolderSelect({ folders }: FolderSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="folder"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        저장할 폴더
      </label>
      <select
        id="folder"
        name="folder"
        defaultValue=""
        required
        className="h-11 rounded-lg border border-black/[.08] bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-white/[.08] dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500"
      >
        <option value="" disabled>
          폴더를 선택하세요
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
}
