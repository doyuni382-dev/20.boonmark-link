"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/toast";
import { useToast } from "@/app/_lib/use-toast";
import { createClient } from "@/utils/supabase/client";

// Supabase가 돌려주는 영어 오류를 한국어 안내 문구로 바꾼다.
function toKoreanError(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("already registered") || normalized.includes("already exists")) {
    return "이미 가입된 이메일입니다.";
  }
  if (normalized.includes("password") && normalized.includes("6")) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }
  if (normalized.includes("valid email") || normalized.includes("invalid email")) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function SignupPage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    email.trim() !== "" &&
    password !== "" &&
    passwordConfirm !== "" &&
    !isSubmitting;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    if (password !== passwordConfirm) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        showToast(toKoreanError(error.message));
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      showToast("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      {message && <Toast message={message} />}

      <Link
        href="/"
        className="text-center text-2xl font-bold text-[var(--accent)]"
      >
        북마크링크
      </Link>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex h-11 items-center justify-center rounded-md px-4 text-base font-medium"
        >
          {isSubmitting ? "처리 중..." : "회원가입"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-sub)]">
        회원가입 시{" "}
        <Link href="/privacy" className="font-medium text-[var(--accent)]">
          개인정보 처리방침
        </Link>
        에 동의하는 것으로 간주됩니다.
      </p>

      <p className="text-center text-sm text-[var(--text-sub)]">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-[var(--accent)]">
          로그인
        </Link>
      </p>
    </div>
  );
}
