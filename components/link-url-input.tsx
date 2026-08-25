export function LinkUrlInput() {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="link-url"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        링크 주소
      </label>
      <input
        id="link-url"
        name="url"
        type="url"
        required
        placeholder="https://example.com"
        className="h-11 rounded-lg border border-black/[.08] bg-white px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/[.08] dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500"
      />
    </div>
  );
}
