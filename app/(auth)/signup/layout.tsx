import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "북마크링크 계정을 만드세요.",
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children;
}
