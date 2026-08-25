import type { Folder } from "@/app/_lib/types";

interface FolderSelectProps {
  folders: Folder[];
}

export function FolderSelect({ folders }: FolderSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="folder" className="text-base font-medium text-[var(--text)]">
        저장할 폴더
      </label>
      <select
        id="folder"
        name="folder"
        defaultValue=""
        required
        className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)]"
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
