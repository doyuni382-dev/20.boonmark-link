"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// 현재 로그인된 사용자의 id를 반환한다.
// 로그인·로그아웃·계정 전환이 일어나면 값이 갱신된다. (비로그인 시 null)
export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // 구독 직후 INITIAL_SESSION 이벤트로 초기 값이 채워지고,
    // 이후 SIGNED_IN / SIGNED_OUT 등에서 다시 호출된다.
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return userId;
}
