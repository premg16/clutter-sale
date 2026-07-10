import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./v4.css";

// The inspiration's display face is a high-contrast editorial serif. Fraunces
// is variable, so the `opsz`/`SOFT` axes let the big headline sit heavier than
// the section titles without shipping a second weight.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Clutter Sale — The Thing You Stopped Using Is Someone's Answer",
  description:
    "Sell what you no longer use and send 100% of the sale price to a cause you choose. For sellers, bidders, and the nonprofits they fund.",
};

// NOTE: Lenis smooth scroll is already mounted by <SmoothScroll> in the root
// layout and wraps this route. Do not mount it again here.
//
// `data-v4` scopes the route; `.v4` on the page root scopes every token in
// v4.css so nothing leaks into `/`, `/v2` or `/v3`.
export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div data-v4 className={fraunces.variable}>
      {children}
    </div>
  );
}
