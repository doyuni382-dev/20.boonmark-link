import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Link
        href="/"
        className="text-center text-2xl font-bold text-[var(--accent)]"
      >
        북마크링크
      </Link>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-base font-medium text-[var(--text)]"
          >
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-base font-medium text-[var(--text)]"
          >
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력하세요"
            className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password-confirm"
            className="text-base font-medium text-[var(--text)]"
          >
            비밀번호 확인
          </label>
          <input
            id="password-confirm"
            name="password-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 다시 입력하세요"
            className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <button
          type="submit"
          className="btn-primary mt-2 flex h-11 items-center justify-center rounded-md px-4 text-base font-medium"
        >
          회원가입
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-sub)]">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-[var(--accent)]">
          로그인
        </Link>
      </p>
    </div>
  );
}
