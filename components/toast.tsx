"use client";

interface ToastProps {
  message: string;
}

// 화면 중앙 상단에 뜨는 알림 메시지. 지금은 오류 안내에만 사용한다.
export function Toast({ message }: ToastProps) {
  return (
    <div
      role="alert"
      className="toast fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-md px-4 py-2.5 text-sm font-medium"
    >
      {message}
    </div>
  );
}
