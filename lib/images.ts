cat > lib/images.ts << 'EOF'
export const IMAGE_BASE = '/images';

export interface ProductImageSet {
  slug: string;
  hero: string;
  gallery: string[];
  variants: Record<string, string>;
}

const PLACEHOLDER = `${IMAGE_BASE}/ui/placeholders/product-placeholder.svg`;

export const PRODUCT_IMAGES: Record<string, ProductImageSet> = {
  'aurora-pro': {
    slug: 'aurora-pro',
    hero: `${IMAGE_BASE}/products/aurora-pro/hero.jpg`,
    gallery: [
      `${IMAGE_BASE}/products/aurora-pro/gallery/01.jpg`,
      `${IMAGE_BASE}/products/aurora-pro/gallery/02.jpg`,
      `${IMAGE_BASE}/products/aurora-pro/gallery/03.jpg`,
    ],
    variants: {
      'black': `${IMAGE_BASE}/products/aurora-pro/variants/black.jpg`,
      'clear': `${IMAGE_BASE}/products/aurora-pro/variants/clear.jpg`,
    },
  },
  'crystal-edition': {
    slug: 'crystal-edition',
    hero: `${IMAGE_BASE}/products/crystal-edition/hero.jpg`,
    gallery: [
      `${IMAGE_BASE}/products/crystal-edition/gallery/01.jpg`,
    ],
    variants: {
      'crystal': `${IMAGE_BASE}/products/crystal-edition/variants/crystal.jpg`,
    },
  },
  'sport': {
    slug: 'sport',
    hero: `${IMAGE_BASE}/products/sport/hero.jpg`,
    gallery: [
      `${IMAGE_BASE}/products/sport/gallery/01.jpg`,
      `${IMAGE_BASE}/products/sport/gallery/02.jpg`,
    ],
    variants: {
      'red': `${IMAGE_BASE}/products/sport/variants/red.jpg`,
      'black': `${IMAGE_BASE}/products/sport/variants/black.jpg`,
    },
  },
};

export const CATEGORY_IMAGES = {
  'valentines': `${IMAGE_BASE}/categories/valentines-day.jpg`,
  'aurora-lineup': `${IMAGE_BASE}/categories/aurora-lineup.jpg`,
  'immersive': `${IMAGE_BASE}/categories/immersive-lifestyle.jpg`,
};

export const MARKETING_IMAGES = {
  tradeIn: `${IMAGE_BASE}/marketing/trade-in/hero.jpg`,
  care: `${IMAGE_BASE}/marketing/care/card.png`,
};

export function getProductImages(slug: string): ProductImageSet {
  const images = PRODUCT_IMAGES[slug];
  if (!images) {
    console.warn(`Product images not found for: ${slug}`);
    return {
      slug,
      hero: PLACEHOLDER,
      gallery: [],
      variants: {},
    };
  }
  return images;
}

export function getProductVariantImage(slug: string, variant: string): string {
  const product = getProductImages(slug);
  return product.variants[variant] || product.hero;
}

export function getGalleryImages(slug: string): string[] {
  const product = getProductImages(slug);
  return product.gallery.length > 0 ? product.gallery : [product.hero];
}
EOF