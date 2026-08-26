interface LinkUrlInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function LinkUrlInput({ value, onChange }: LinkUrlInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="link-url"
        className="text-base font-medium text-[var(--text)]"
      >
        링크 주소
      </label>
      <input
        id="link-url"
        name="url"
        type="url"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com"
        className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
      />
    </div>
  );
}
