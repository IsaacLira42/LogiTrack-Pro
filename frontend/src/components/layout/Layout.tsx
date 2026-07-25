import type { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />

      <div className="flex">
        <aside className="fixed top-16 left-0 w-[280px] h-[calc(100vh-64px)]">
          <Sidebar />
        </aside>

        <main className="ml-[280px] flex-1">{children}</main>
      </div>
    </div>
  );
};
