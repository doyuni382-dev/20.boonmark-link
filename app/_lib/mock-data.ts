import type { Bookmark, Folder } from "./types";

export const mockFolders: Folder[] = [
  { id: "all", name: "전체", count: 12 },
  { id: "work", name: "업무", count: 5 },
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 2 },
  { id: "read-later", name: "읽을거리", count: 1 },
];

export const mockBookmarks: Bookmark[] = [
  {
    id: "1",
    folderId: "dev",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서, App Router와 최신 기능을 확인할 수 있습니다.",
  },
  {
    id: "2",
    folderId: "dev",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크 공식 사이트.",
  },
  {
    id: "3",
    folderId: "work",
    title: "GitHub",
    url: "https://github.com",
    description: "코드 저장소와 협업을 위한 플랫폼.",
  },
  {
    id: "4",
    folderId: "design",
    title: "Figma",
    url: "https://figma.com",
    description: "협업 UI 디자인 툴.",
  },
  {
    id: "5",
    folderId: "work",
    title: "Vercel",
    url: "https://vercel.com",
    description: "프론트엔드 배포 플랫폼.",
  },
  {
    id: "6",
    folderId: "read-later",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준 기술 문서 모음.",
  },
];
