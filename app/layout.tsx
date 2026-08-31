import type { Metadata } from "next";
import { BookmarkProvider } from "./_lib/bookmark-context";
import { FolderProvider } from "./_lib/folder-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "북마크링크",
  description: "링크를 폴더로 정리하고 빠르게 찾는 북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FolderProvider>
          <BookmarkProvider>{children}</BookmarkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
