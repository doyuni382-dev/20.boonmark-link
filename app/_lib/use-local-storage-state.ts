"use client";

import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // 서버에는 localStorage가 없어 마운트 이후 한 번만 읽어와 하이드레이션한다.
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        // 서버에는 없는 localStorage를 읽어와 마운트 후 한 번만 동기화하는 것이라 의도된 예외
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(stored) as T);
      }
    } catch {
      // localStorage를 사용할 수 없으면 초기값을 그대로 사용
    } finally {
      setHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 저장 공간 부족 등으로 실패해도 무시
    }
  }, [key, value, hydrated]);

  return [value, setValue] as const;
}
