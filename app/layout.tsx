import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://renno.app"),
  title: "Renno | Kill the guesswork.",
  description:
    "Renno connects homeowners with verified tradespeople using transparent quotes, milestone escrow, and real-time project tracking.",
  openGraph: {
    title: "Renno",
    description:
      "Verified pros, transparent quotes, and escrow-protected payments for renovations and home services.",
    url: "https://renno.app",
    siteName: "Renno"
  },
  twitter: {
    card: "summary_large_image",
    title: "Renno",
    description: "Kill the guesswork. Ship the renovation."
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
