import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/80 px-4 backdrop-blur-sm">
      <Link href="/" className="text-lg font-semibold text-[var(--text)]">
        북마크링크
      </Link>
      <Link
        href="/new"
        className="btn-primary flex h-9 items-center gap-1.5 rounded-md px-4 text-base font-medium"
      >
        <span aria-hidden>+</span>
        새 링크
      </Link>
    </header>
  );
}
