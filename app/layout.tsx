import type { Metadata } from "next";
import { BookmarkProvider } from "./_lib/bookmark-context";
import { FolderProvider } from "./_lib/folder-context";
import "./globals.css";

// 배포 도메인. 프로덕션에서는 NEXT_PUBLIC_SITE_URL 환경변수로 지정한다.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = "링크를 폴더로 정리하고 빠르게 찾는 북마크 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // 하위 페이지에서 title을 지정하면 "%s | 북마크링크" 형태로 조합된다.
  title: {
    default: "북마크링크",
    template: "%s | 북마크링크",
  },
  description,
  openGraph: {
    title: "북마크링크",
    description,
    siteName: "북마크링크",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/thumbnail.jpg",
        width: 2400,
        height: 1260,
        alt: "북마크링크",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "북마크링크",
    description,
    images: ["/thumbnail.jpg"],
  },
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
