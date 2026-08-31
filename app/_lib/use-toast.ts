"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// 일정 시간 뒤 자동으로 사라지는 토스트 메시지 상태를 관리한다.
export function useToast(duration = 4000) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (next: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setMessage(next);
      timerRef.current = setTimeout(() => setMessage(null), duration);
    },
    [duration],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { message, showToast };
}
