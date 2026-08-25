import { mockFolders } from "@/app/_lib/mock-data";
import { AiButton } from "./ai-button";
import { FolderList } from "./folder-list";

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-black/[.08] bg-white px-3 py-4 dark:border-white/[.08] dark:bg-black sm:block">
      <AiButton />
      <FolderList folders={mockFolders} />
    </aside>
  );
}
