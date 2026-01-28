import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import BNPLWidget from "@/components/sections/BNPLWidget";
import TradeInPromo from "@/components/sections/TradeInPromo";
import SwapPreview from "@/components/sections/SwapPreview";
import TrustSignals from "@/components/sections/TrustSignals";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProductGrid />
      <BNPLWidget />
      <TradeInPromo />
      <SwapPreview />
      <TrustSignals />
      <Footer />
    </main>
  );
}