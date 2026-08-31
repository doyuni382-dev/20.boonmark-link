"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/toast";
import { KakaoLoginButton } from "@/components/kakao-login-button";
import { useToast } from "@/app/_lib/use-toast";
import { createClient } from "@/utils/supabase/client";

// Supabase가 돌려주는 영어 오류를 한국어 안내 문구로 바꾼다.
function toKoreanError(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (normalized.includes("email not confirmed")) {
    return "이메일 인증이 완료되지 않았습니다.";
  }
  if (normalized.includes("valid email") || normalized.includes("invalid email")) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function LoginPage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    email.trim() !== "" && password !== "" && !isSubmitting;

  // 소셜 로그인 콜백이 실패하면 /login?error=oauth 로 되돌아온다.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "oauth") {
      showToast("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      window.history.replaceState(null, "", "/login");
    }
  }, [showToast]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
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
      showToast("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex h-11 items-center justify-center rounded-md px-4 text-base font-medium"
        >
          {isSubmitting ? "처리 중..." : "로그인"}
        </button>

        <KakaoLoginButton onError={showToast} />
      </form>

      <div className="flex flex-col gap-2 text-center text-sm text-[var(--text-sub)]">
        <Link
          href="/forgot-password"
          className="font-medium text-[var(--accent)]"
        >
          비밀번호 찾기
        </Link>
        <p>
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="font-medium text-[var(--accent)]">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
