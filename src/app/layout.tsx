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

// Runs before first paint to set the theme class, so there's no light-mode
// flash for dark-mode users. Respects a saved choice, else the OS preference.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${outfit.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh flex flex-col selection:bg-brand-pink selection:text-brand-navy">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
