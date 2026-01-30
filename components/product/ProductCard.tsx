// components/product/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import LiquidCard from "@/components/ui/LiquidCard";
import LiquidButton from "@/components/ui/LiquidButton";
import Badge from "@/components/ui/Badge";
import ConditionBadge from "@/components/ui/ConditionBadge";
import type { Product } from "@/lib/data";

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <Link href={`/product/${product.slug}`} className={cn("block", className)}>
      <LiquidCard variant="standard" size="lg" className="h-full group">
        {/* Image Container */}
        <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-2xl bg-apple-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount && discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.condition === "Like New" && <Badge variant="new">Like New</Badge>}
            {product.bnplAvailable && <Badge variant="bnpl">BNPL</Badge>}
            {!product.inStock && <Badge variant="stock">Out of Stock</Badge>}
          </div>

          {/* Trade-in Badge */}
          {product.tradeInAvailable && (
            <div className="absolute top-3 right-3">
              <Badge variant="trade-in">Trade-in</Badge>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <Heart className="w-4 h-4 text-apple-dark" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Category & Condition */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-apple-gray-200 uppercase tracking-wider">{product.category}</p>
            <ConditionBadge condition={product.condition} size="sm" />
          </div>

          {/* Name */}
          <h3 className="font-semibold text-apple-dark line-clamp-2 group-hover:text-lumina-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-apple-gray-200 line-clamp-2">
            {product.description}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-semibold text-apple-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-apple-gray-200 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Monthly Payment */}
          {product.bnplAvailable && (
            <p className="text-xs text-lumina-primary font-medium">
              From {formatPrice(monthlyPayment)}/month
            </p>
          )}

          {/* Add to Cart Button */}
          <div className="pt-2" onClick={(e) => e.preventDefault()}>
            <LiquidButton
              variant={product.inStock ? "primary" : "ghost"}
              size="sm"
              className="w-full"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              leftIcon={product.inStock ? <ShoppingBag className="w-4 h-4" /> : undefined}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </LiquidButton>
          </div>
        </div>
      </LiquidCard>
    </Link>
  );
}