"use client";

import { useState } from "react";
import Image from "next/image";
import kakaoLoginImage from "../public/kakao_login_large_wide.png";
import { createClient } from "@/utils/supabase/client";

interface KakaoLoginButtonProps {
  onError: (message: string) => void;
}

export function KakaoLoginButton({ onError }: KakaoLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleKakaoLogin() {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      // 정상 흐름에서는 이 지점 전에 카카오 페이지로 이동한다.
      if (error) {
        onError("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
        setIsLoading(false);
      }
    } catch {
      onError("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      disabled={isLoading}
      aria-label="카카오로 로그인"
      className="block w-full overflow-hidden rounded-md disabled:opacity-40"
    >
      <Image
        src={kakaoLoginImage}
        alt="카카오 로그인"
        priority
        className="h-auto w-full"
      />
    </button>
  );
}
