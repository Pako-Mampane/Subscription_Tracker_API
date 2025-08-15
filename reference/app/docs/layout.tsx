import type React from "react";
import { Navigation } from "@/components/Navigation";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {children}
    </div>
  );
}
