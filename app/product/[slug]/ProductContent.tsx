"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ConditionBadge from "@/components/ui/ConditionBadge";
import BNPLWidget from "@/components/product/BNPLWidget";
import TradeInWidget from "@/components/product/TradeInWidget";
import ProductTabs from "@/components/product/ProductTabs";
import { ShoppingBag, Truck, Shield, RotateCcw, Check, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { Product } from "@/lib/data";

interface ProductContentProps {
  product: Product;
}

export default function ProductContent({ product }: ProductContentProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-white pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-apple-gray-100 rounded-3xl overflow-hidden group">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
                priority
              />
              
              <div className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5 text-apple-dark" />
              </div>

              {images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-auto pb-2 no-scrollbar">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden transition-all ${
                      selectedImage === index ? 'ring-2 ring-apple-blue ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={image} alt={`${product.name} - ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="new">{product.category}</Badge>
                {product.bnplAvailable && <Badge variant="bnpl">BNPL</Badge>}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-apple-dark mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <ConditionBadge condition={product.condition} />
                {product.inStock ? (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" /> In Stock
                  </span>
                ) : (
                  <span className="text-sm text-error">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="bg-apple-gray-100 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-apple-dark">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-apple-gray-200 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600">
                  Save {formatPrice(product.originalPrice - product.price)} (
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                </p>
              )}
            </div>

            <Button 
              size="lg" 
              className="w-full"
              disabled={!product.inStock || added}
              onClick={handleAddToCart}
              leftIcon={added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
            >
              {added ? "Added to Cart!" : product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-apple-gray-300">
                <Truck className="w-4 h-4" />
                <span>Free delivery in Nairobi</span>
              </div>
              <div className="flex items-center gap-2 text-apple-gray-300">
                <Shield className="w-4 h-4" />
                <span>1 year warranty</span>
              </div>
              <div className="flex items-center gap-2 text-apple-gray-300">
                <RotateCcw className="w-4 h-4" />
                <span>7-day returns</span>
              </div>
            </div>

            {product.bnplAvailable && <BNPLWidget price={product.price} />}

            {product.tradeInAvailable && (
              <TradeInWidget currentProductPrice={product.price} />
            )}
          </div>
        </div>

        <ProductTabs description={product.description} specs={product.specs || {}} />
      </div>
    </div>
  );
}