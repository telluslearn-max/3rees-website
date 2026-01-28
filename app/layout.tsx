import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3rees | Premium Refurbished Electronics Kenya",
  description: "Shop certified refurbished iPhones, MacBooks, Samsung, Starlink & gaming consoles. Premium quality, 1-year warranty, COD nationwide. Trade-ins & BNPL available.",
  keywords: "refurbished iPhone Kenya, used MacBook Nairobi, Starlink Kenya, game swap, trade-in phone, BNPL electronics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}