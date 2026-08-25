import Link from "next/link";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/[.08] bg-white px-6 dark:border-white/[.08] dark:bg-black">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
      >
        북마크링크
      </Link>
      <Link
        href="/new"
        className="flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        <span aria-hidden>+</span>
        새 링크
      </Link>
    </header>
  );
}
