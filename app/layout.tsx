import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "KarjoMoney — Demo Casino", description: "Virtual coins only demo casino" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
