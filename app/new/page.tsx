import { NewLinkForm } from "@/components/new-link-form";
import { mockFolders } from "../_lib/mock-data";

const saveableFolders = mockFolders.filter((folder) => folder.id !== "all");

export default function NewLinkPage() {
  return (
    <div className="flex flex-col items-center gap-6 p-6 pt-16">
      <h1 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
        새 링크 추가
      </h1>
      <NewLinkForm folders={saveableFolders} />
    </div>
  );
}
