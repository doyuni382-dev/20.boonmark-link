import { NewLinkForm } from "@/components/new-link-form";

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
