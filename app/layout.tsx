import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "3rees | Premium Refurbished Electronics Kenya",
    template: "%s | 3rees",
  },
  description: "Shop certified refurbished iPhones, MacBooks, Samsung, Starlink & gaming consoles. Premium quality, 1-year warranty, COD nationwide. Trade-ins & BNPL available.",
  keywords: ["refurbished iPhone Kenya", "used MacBook Nairobi", "Starlink Kenya", "game swap", "trade-in phone", "BNPL electronics"],
  authors: [{ name: "3rees" }],
  creator: "3rees",
  metadataBase: new URL("https://3rees.co.ke"),
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://3rees.co.ke",
    siteName: "3rees",
    title: "3rees | Premium Refurbished Electronics Kenya",
    description: "Shop certified refurbished iPhones, MacBooks, Samsung with 1-year warranty",
  },
  twitter: {
    card: "summary_large_image",
    title: "3rees | Premium Refurbished Electronics Kenya",
    description: "Shop certified refurbished iPhones, MacBooks, Samsung with 1-year warranty",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased bg-white text-apple-dark`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}