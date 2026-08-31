import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "로그인",
  description: "북마크링크에 로그인하세요.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
