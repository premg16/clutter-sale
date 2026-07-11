import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import "./v4-type.css";

// Staging's real type pairing: Calistoga for headings, Inter for body.
// Scoped to this route via a wrapper div — the root layout keeps loading
// Anton/Outfit for `/`, `/v1`, `/v2` and `/v3`, which must not change.
const calistoga = Calistoga({
  variable: "--font-calistoga",
  subsets: ["latin"],
  weight: "400", // Calistoga ships a single weight
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clutter Sale — Turn Unused Items Into Good",
  description:
    "Snap a few photos, sell locally, and send the proceeds to a cause you choose.",
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${calistoga.variable} ${inter.variable} v4-type`}>
      {children}
    </div>
  );
}
