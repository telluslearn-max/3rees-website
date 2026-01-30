"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/data";
import ConditionBadge from "../ui/ConditionBadge";

export default function ProductGrid() {
  return (
    <section className="section-large bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="apple-headline text-4xl md:text-5xl mb-4">The latest.</h2>
          <p className="apple-subhead">Take a look at what's new.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/product/${product.slug}/`}>
                <div className="product-card group cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-square bg-white p-8 flex items-center justify-center overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute top-4 left-4">
                      <ConditionBadge condition={product.condition} />
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm">View</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-semibold">Ksh {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-400 line-through">Ksh {product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          Save Ksh {(product.originalPrice - product.price).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {product.bnplAvailable && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-blue-600 font-medium">
                          From Ksh {Math.round(product.price * 0.4 / 12).toLocaleString()}/week with BNPL
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/shop" className="apple-button-secondary">View All Products</Link>
        </motion.div>
      </div>
    </section>
  );
}