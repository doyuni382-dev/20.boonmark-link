"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Toast } from "@/components/toast";
import { useToast } from "@/app/_lib/use-toast";
import { createClient } from "@/utils/supabase/client";

// Supabase가 돌려주는 영어 오류를 한국어 안내 문구로 바꾼다.
function toKoreanError(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("valid email") || normalized.includes("invalid email")) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  }
  return "링크 발송에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function ForgotPasswordPage() {
  const { message, showToast } = useToast();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const canSubmit = email.trim() !== "" && !isSubmitting;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        showToast(toKoreanError(error.message));
        return;
      }

      setIsSent(true);
    } catch {
      showToast("링크 발송에 실패했습니다. 잠시 후 다시 시도해주세요.");
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

      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-xl font-semibold text-[var(--text)]">비밀번호 찾기</h1>
        <p className="text-sm text-[var(--text-sub)]">
          가입한 이메일로 비밀번호 재설정 링크를 보내드립니다.
        </p>
      </div>

      {isSent ? (
        <p className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-center text-sm text-[var(--text)]">
          <span className="font-medium">{email.trim()}</span> 로 재설정 링크를
          보냈습니다. 메일함을 확인해주세요.
        </p>
      ) : (
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

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary mt-2 flex h-11 items-center justify-center rounded-md px-4 text-base font-medium"
          >
            {isSubmitting ? "발송 중..." : "비밀번호 리셋 링크 발송"}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-[var(--text-sub)]">
        <Link href="/login" className="font-medium text-[var(--accent)]">
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
