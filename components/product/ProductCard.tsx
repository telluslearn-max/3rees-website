"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConditionBadge from "@/components/ui/ConditionBadge";

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

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const monthlyPayment = Math.round(product.price * 0.6 / 6);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative", className)}
    >
      <div className="product-card relative bg-white rounded-3xl overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] bg-apple-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {discount && discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.condition === "Like New" && <Badge variant="new">Like New</Badge>}
            {product.bnplAvailable && <Badge variant="bnpl">BNPL</Badge>}
            {!product.inStock && <Badge variant="stock">Out of Stock</Badge>}
          </div>

          {product.tradeInAvailable && (
            <div className="absolute top-4 right-4">
              <Badge variant="trade-in">Trade-in</Badge>
            </div>
          )}

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              aria-label="Add to wishlist"
              className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <Heart className="w-5 h-5 text-apple-dark" />
            </button>
          </div>
        </Link>

        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-apple-gray-200 uppercase tracking-wider">{product.category}</p>
            <ConditionBadge condition={product.condition} size="sm" />
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-semibold text-apple-dark mb-2 line-clamp-2 group-hover:text-apple-blue transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-apple-gray-200 line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-semibold text-apple-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-apple-gray-200 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.bnplAvailable && (
            <p className="text-xs text-apple-blue font-medium mb-4">
              From {formatPrice(monthlyPayment)}/month with BNPL
            </p>
          )}

          <Button 
            className="w-full"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            leftIcon={product.inStock ? <ShoppingBag className="w-4 h-4" /> : undefined}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}