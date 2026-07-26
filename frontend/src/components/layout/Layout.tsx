import type { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />

      <div className="flex">
        <div className="fixed top-16 left-0 h-[calc(100vh-64px)] w-16 md:w-57.5">
          <Sidebar />
        </div>

        <main className="flex-1 pt-20 md:pt-24 pb-8 px-4 md:px-8 ml-16 md:ml-57.5 transition-all">
          {children}
        </main>
      </div>
    </div>
  );
};
