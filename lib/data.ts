export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: "Like New" | "Excellent" | "Good" | "Fair";
  image: string;
  bnplAvailable: boolean;
  tradeInAvailable: boolean;
  specs?: Record<string, string>;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "iphone-15-pro-max-256gb",
    name: "iPhone 15 Pro Max",
    category: "iPhone",
    description: "Titanium design. A17 Pro chip. 48MP camera system. The most powerful iPhone ever.",
    price: 145000,
    originalPrice: 185000,
    condition: "Like New",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-select?wid=800",
    bnplAvailable: true,
    tradeInAvailable: true,
    specs: { "Storage": "256GB", "Color": "Natural Titanium", "Battery Health": "98%", "Warranty": "AppleCare+ until 2025" },
    inStock: true
  },
  {
    id: "2",
    slug: "macbook-air-m2-15",
    name: "MacBook Air 15\" M2",
    category: "Mac",
    description: "Impressively big. Impossibly thin. The 15-inch MacBook Air with M2 chip.",
    price: 165000,
    originalPrice: 210000,
    condition: "Excellent",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-15-midnight-select-202306?wid=800",
    bnplAvailable: true,
    tradeInAvailable: true,
    specs: { "Chip": "Apple M2", "Memory": "8GB unified", "Storage": "256GB SSD", "Color": "Midnight" },
    inStock: true
  },
  {
    id: "3",
    slug: "samsung-s24-ultra-512gb",
    name: "Samsung Galaxy S24 Ultra",
    category: "Samsung",
    description: "Galaxy AI is here. 200MP camera. S Pen built-in. Titanium frame.",
    price: 135000,
    originalPrice: 175000,
    condition: "Like New",
    image: "https://images.samsung.com/uk/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-gray-back-mo.jpg?wid=800",
    bnplAvailable: true,
    tradeInAvailable: true,
    specs: { "Storage": "512GB", "Color": "Titanium Gray", "Display": "6.8\" QHD+ AMOLED", "S Pen": "Yes" },
    inStock: true
  },
  {
    id: "4",
    slug: "starlink-standard-kit",
    name: "Starlink Standard Kit",
    category: "Starlink",
    description: "High-speed, low-latency internet. Perfect for homes and businesses in Kenya.",
    price: 45000,
    originalPrice: 55000,
    condition: "Like New",
    image: "https://www.starlink.com/assets/images/dish-v2-1.jpg",
    bnplAvailable: true,
    tradeInAvailable: false,
    specs: { "Speed": "Up to 200 Mbps", "Latency": "20-40ms", "Coverage": "Nationwide", "Installation": "Self-install" },
    inStock: true
  },
  {
    id: "5",
    slug: "playstation-5-slim",
    name: "PlayStation 5 Slim",
    category: "Gaming",
    description: "The new PS5 Slim. Same powerful performance, smaller design. 1TB storage.",
    price: 68000,
    originalPrice: 85000,
    condition: "Excellent",
    image: "https://media.direct.playstation.com/is/image/sierialto/PS5-DualSense-Controller-Portal-Image-Hero-01-en-11nov24",
    bnplAvailable: true,
    tradeInAvailable: true,
    specs: { "Storage": "1TB SSD", "Resolution": "4K 120Hz", "Controller": "DualSense included", "Color": "White" },
    inStock: true
  },
  {
    id: "6",
    slug: "ipad-pro-m2-11",
    name: "iPad Pro 11\" M2",
    category: "iPad",
    description: "Supercharged by M2. Liquid Retina display. Apple Pencil hover.",
    price: 95000,
    originalPrice: 125000,
    condition: "Good",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-og-202210?wid=800",
    bnplAvailable: true,
    tradeInAvailable: true,
    specs: { "Chip": "Apple M2", "Storage": "128GB", "Display": "11\" Liquid Retina", "Cellular": "WiFi + 5G" },
    inStock: true
  },
  {
    id: "7",
    slug: "airpods-pro-2nd-gen",
    name: "AirPods Pro 2nd Gen",
    category: "Accessories",
    description: "Rebuilt from the sound up. Adaptive Audio. Personalized Volume.",
    price: 28000,
    originalPrice: 35000,
    condition: "Like New",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=800",
    bnplAvailable: false,
    tradeInAvailable: false,
    specs: { "Chip": "H2", "Noise Cancellation": "2x more", "Battery": "6 hours listening", "Case": "MagSafe Charging" },
    inStock: true
  },
  {
    id: "8",
    slug: "xbox-series-x",
    name: "Xbox Series X",
    category: "Gaming",
    description: "The fastest, most powerful Xbox ever. 12 TFLOPS. 1TB SSD.",
    price: 65000,
    originalPrice: 80000,
    condition: "Excellent",
    image: "https://assets.xboxservices.com/assets/0b/28/0b2854b9-a7e5-4c00-96d9-6e5c3e7e0e9b.jpg?n=Xbox-Series-X_Image-0_1083x1222.jpg",
    bnplAvailable: true,
    tradeInAvailable: true,
    specs: { "Storage": "1TB SSD", "Resolution": "4K 120Hz", "Game Pass": "Compatible", "Color": "Black" },
    inStock: true
  },
  {
    id: "9",
    slug: "nintendo-switch-oled",
    name: "Nintendo Switch OLED",
    category: "Gaming",
    description: "7-inch OLED screen. Enhanced audio. 64GB storage. Play anywhere.",
    price: 42000,
    originalPrice: 52000,
    condition: "Good",
    image: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/switch/site-design-update/oled-model-photo-02",
    bnplAvailable: true,
    tradeInAvailable: true,
    specs: { "Screen": "7\" OLED", "Storage": "64GB", "Battery": "4.5-9 hours", "Color": "White" },
    inStock: true
  }
];

export const categories = [
  { name: "iPhone", slug: "iphone", count: 45 },
  { name: "Mac", slug: "mac", count: 32 },
  { name: "iPad", slug: "ipad", count: 28 },
  { name: "Samsung", slug: "samsung", count: 56 },
  { name: "Gaming", slug: "gaming", count: 89 },
  { name: "Starlink", slug: "starlink", count: 12 },
  { name: "Accessories", slug: "accessories", count: 134 }
];

export const trustStats = [
  { value: "15,000+", label: "Happy Customers" },
  { value: "500+", label: "Products Available" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "72-Hour", label: "Delivery Nairobi" }
];