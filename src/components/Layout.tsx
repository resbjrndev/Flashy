"use client";

import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}