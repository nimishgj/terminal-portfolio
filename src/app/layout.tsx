import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Nimisha G J | Software Developer",
  description: "Software developer with experience in observability, web development, and cloud technologies",
  keywords: ["software developer", "web development", "observability", "cloud", "portfolio"],
  authors: [{ name: "Nimisha G J" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className}`}>
        {children}
      </body>
    </html>
  );
}
