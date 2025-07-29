import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Ads Generator",
  description: "Generate AI-powered advertisements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={`${rubik.className} antialiased`}>
            <header className="border-b bg-white px-4 py-3">
              <div className="mx-auto flex max-w-7xl items-center justify-between">
                <h1 className="text-xl font-semibold">AI Ads Generator</h1>
                <div className="flex items-center gap-4">
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </header>
            <main>{children}</main>
          </body>
        </html>
      </ClerkProvider>
    </ConvexClientProvider>
  );
}
