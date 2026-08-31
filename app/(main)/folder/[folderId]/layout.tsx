import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "폴더",
  description: "폴더별로 정리된 북마크 목록",
};

export default function FolderLayout({ children }: { children: ReactNode }) {
  return children;
}
