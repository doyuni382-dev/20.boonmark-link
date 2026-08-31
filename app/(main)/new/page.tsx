import type { Metadata } from "next";
import { NewLinkForm } from "@/components/new-link-form";

export const metadata: Metadata = {
  title: "새 링크 추가",
  description: "URL을 붙여넣어 새 북마크를 폴더에 저장하세요.",
};

export default function NewLinkPage() {
  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-6 px-6 pt-16">
      <h1 className="text-3xl font-bold leading-tight text-[var(--text)]">
        새 링크 추가
      </h1>
      <NewLinkForm />
    </div>
  );
}
