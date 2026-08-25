export function AiButton() {
  return (
    <button
      type="button"
      className="list-hover flex w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-base font-medium text-[var(--text)]"
    >
      <span aria-hidden>✨</span>
      AI로 링크 정리하기
    </button>
  );
}
