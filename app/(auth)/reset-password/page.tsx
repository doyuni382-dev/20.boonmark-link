"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/toast";
import { useToast } from "@/app/_lib/use-toast";
import { createClient } from "@/utils/supabase/client";

// Supabase가 돌려주는 영어 오류를 한국어 안내 문구로 바꾼다.
function toKoreanError(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("password") && normalized.includes("6")) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }
  if (normalized.includes("same") && normalized.includes("password")) {
    return "이전과 다른 비밀번호를 입력해주세요.";
  }
  return "비밀번호 재설정에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

type LinkStatus = "checking" | "ready" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [status, setStatus] = useState<LinkStatus>("checking");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이메일 링크로 들어오면 Supabase 클라이언트가 URL의 코드를 복구 세션으로 교환한다.
  // 초기화가 끝난 뒤(INITIAL_SESSION) 세션 유무로 링크 유효성을 판단한다.
  useEffect(() => {
    const supabase = createClient();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "INITIAL_SESSION" ||
        event === "PASSWORD_RECOVERY" ||
        event === "SIGNED_IN"
      ) {
        setStatus(session ? "ready" : "invalid");
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const canSubmit =
    status === "ready" &&
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
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        showToast(toKoreanError(error.message));
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      showToast("비밀번호 재설정에 실패했습니다. 잠시 후 다시 시도해주세요.");
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

      <h1 className="text-center text-xl font-semibold text-[var(--text)]">
        비밀번호 재설정
      </h1>

      {status === "checking" && (
        <p className="text-center text-sm text-[var(--text-sub)]">
          링크를 확인하는 중입니다...
        </p>
      )}

      {status === "invalid" && (
        <div className="flex flex-col gap-4 text-center">
          <p className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)]">
            유효하지 않거나 만료된 링크입니다. 다시 요청해주세요.
          </p>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[var(--accent)]"
          >
            비밀번호 찾기로 이동
          </Link>
        </div>
      )}

      {status === "ready" && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-base font-medium text-[var(--text)]"
            >
              새 비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
              className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password-confirm"
              className="text-base font-medium text-[var(--text)]"
            >
              새 비밀번호 확인
            </label>
            <input
              id="password-confirm"
              name="password-confirm"
              type="password"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="새 비밀번호를 다시 입력하세요"
              className="input-field h-11 rounded-md bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary mt-2 flex h-11 items-center justify-center rounded-md px-4 text-base font-medium"
          >
            {isSubmitting ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>
      )}
    </div>
  );
}
