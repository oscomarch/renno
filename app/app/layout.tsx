import type { ReactNode } from "react";

import { Sidebar } from "@/components/app/Sidebar";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1">
        <main className="container-shell py-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
