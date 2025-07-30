"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-full">
        Loading...
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full justify-start gap-2 bg-sidebar-accent/50"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className="text-lg">{theme === "light" ? "🌙" : "☀️"}</span>
      <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
    </Button>
  );
}
