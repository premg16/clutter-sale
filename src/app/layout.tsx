import type { Metadata } from "next";
import { Anton, Outfit } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clutter Sale — Turn Your Stuff Into Someone's Good Day",
  description:
    "Sell your unused stuff, pick a nonprofit, and send 100% of the proceeds straight to them. Your clutter, someone else's good day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-brand-cream selection:bg-brand-pink selection:text-brand-navy">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
