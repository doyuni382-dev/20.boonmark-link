import type { Folder } from "@/app/_lib/types";
import { FolderSelect } from "./folder-select";
import { LinkUrlInput } from "./link-url-input";
import { SaveButton } from "./save-button";

interface NewLinkFormProps {
  folders: Folder[];
}

export function NewLinkForm({ folders }: NewLinkFormProps) {
  return (
    <form className="flex w-full max-w-md flex-col gap-5">
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      <SaveButton />
    </form>
  );
}
