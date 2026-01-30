import { HeroSection } from '@/components/sections/HeroSection'
import { ProductGrid } from '@/components/sections/ProductGrid'
import { ImmersiveShowcase } from '@/components/sections/ImmersiveShowcase'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { ServicesGrid } from '@/components/sections/ServicesGrid'

export default function HomeContent() {
  return (
    <main>
      {/* Valentine's Day Style - Hero */}
      <HeroSection />
      
      {/* iPhone Style - Full Width Product */}
      <ProductGrid />
      
      {/* Top Dogs Style - Immersive Video/Image */}
      <ImmersiveShowcase />
      
      {/* 2-Column Bento: Watch | Watch Unity */}
      {/* 2-Column Bento: iPad Air | iPad Pro */}
      <BentoGrid />
      
      {/* 2-Column: Trade In | Card */}
      <ServicesGrid />
    </main>
  )
}