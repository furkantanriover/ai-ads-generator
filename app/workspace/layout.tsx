import React from "react";
import WorkspaceProvider from "./provider";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <main className="flex min-h-screen flex-col bg-background">
        {children}
      </main>
    </WorkspaceProvider>
  );
}
