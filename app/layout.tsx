import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "@/components/convex-provider";
import { ThemeProviders } from "@/components/theme-providers";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: { default: "Kreator Studio OS", template: "%s — Kreator Studio OS" },
  description:
    "Website OS for content creators, artists, writers & editors — showcase + journal, rich content system, creator dashboard. Free, clone-to-own.",
  openGraph: {
    title: "Kreator Studio OS",
    description:
      "Website OS for content creators, artists, writers & editors — showcase + journal, rich content system, creator dashboard. Free, clone-to-own.",
    type: "website",
    siteName: "Kreator Studio OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kreator Studio OS",
    description:
      "Website OS for content creators, artists, writers & editors — showcase + journal, rich content system, creator dashboard. Free, clone-to-own.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProviders>
          <Suspense fallback={null}>
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </Suspense>
        </ThemeProviders>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
