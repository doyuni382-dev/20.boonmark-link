import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
