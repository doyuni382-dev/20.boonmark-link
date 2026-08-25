import { mockFolders } from "@/app/_lib/mock-data";
import { AiButton } from "./ai-button";
import { FolderList } from "./folder-list";

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-[var(--border)] bg-[var(--bg)] px-3 py-4 sm:block">
      <AiButton />
      <FolderList folders={mockFolders} />
    </aside>
  );
}
