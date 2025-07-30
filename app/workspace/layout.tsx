import React from "react";
import WorkspaceProvider from "./provider";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <div className="flex-1 flex flex-col bg-background">{children}</div>
    </WorkspaceProvider>
  );
}
