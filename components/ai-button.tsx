export function AiButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-white/[.08] dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
    >
      <span aria-hidden>✨</span>
      AI로 링크 정리하기
    </button>
  );
}
