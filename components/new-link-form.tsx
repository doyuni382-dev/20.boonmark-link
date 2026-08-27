"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useBookmarks } from "@/app/_lib/bookmark-context";
import { useFolders } from "@/app/_lib/folder-context";
import { FolderSelect } from "./folder-select";
import { LinkUrlInput } from "./link-url-input";
import { SaveButton } from "./save-button";

export function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addBookmark } = useBookmarks();
  const saveableFolders = folders.filter((folder) => folder.id !== "all");

  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!url || !folderId || isSaving) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "오픈 그래프 정보를 가져오지 못했습니다.",
        );
      }

      await addBookmark({
        folderId,
        title: data.title,
        url: data.url,
        description: data.description,
        thumbnail: data.thumbnail,
      });

      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "링크를 저장하지 못했습니다.",
      );
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5"
    >
      <LinkUrlInput value={url} onChange={setUrl} />
      <FolderSelect
        folders={saveableFolders}
        value={folderId}
        onChange={setFolderId}
      />
      {error && <p className="text-sm text-[var(--error)]">{error}</p>}
      <SaveButton pending={isSaving} />
    </form>
  );
}
