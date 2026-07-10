import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "Clutter Sale — The Thing On Your Shelf Is Already Someone Else's Answer",
  description:
    "Sell what you no longer use, choose a cause, and 100% of the net proceeds reach it. Download the app — for people giving, people buying, and the nonprofits they fund.",
};

// NOTE: Lenis smooth scroll is already mounted by <SmoothScroll> in the root
// layout and wraps this route — do not mount it again here. GSAP's ScrollTrigger
// is bridged to Lenis's ticker inside the page component.
//
// `data-v2` scopes every token in v2.css so nothing leaks into the `/` palette.
export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div data-v2>{children}</div>;
}
