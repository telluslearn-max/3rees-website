"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionBadge from "@/components/ui/ConditionBadge";
import { products, categories } from "@/lib/data";
import { Filter, Grid3X3, List } from "lucide-react";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const conditionMatch = selectedCondition.length === 0 || selectedCondition.includes(product.condition);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && conditionMatch && priceMatch;
  });

  const toggleCondition = (condition: string) => {
    setSelectedCondition((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Store
          </motion.h1>
          <p className="mt-2 text-gray-500">The best in refurbished. Premium quality, guaranteed.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-64 flex-shrink-0"
          >
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === "All" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                    }`}
                  >
                    All Products ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between ${
                        selectedCategory === cat.name ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                      }`}
                    >
                      {cat.name}
                      <span className="text-gray-400">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Condition</h3>
                <div className="space-y-2">
                  {["Like New", "Excellent", "Good", "Fair"].map((condition) => (
                    <label key={condition} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCondition.includes(condition)}
                        onChange={() => toggleCondition(condition)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Ksh {priceRange[0].toLocaleString()}</span>
                    <span>Ksh {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-4">
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-600">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-gray-100" : ""}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/shop/${product.slug}/`}>
                    <div className={`product-card group cursor-pointer ${viewMode === "list" ? "flex flex-row" : ""}`}>
                      <div className={`relative bg-white overflow-hidden ${viewMode === "list" ? "w-48" : "aspect-square"}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <ConditionBadge condition={product.condition} />
                        </div>
                      </div>
                      <div className="p-6 flex-1">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                        <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className={`text-sm text-gray-500 mb-4 ${viewMode === "list" ? "" : "line-clamp-2"}`}>
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-semibold">Ksh {product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                Ksh {product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        {product.bnplAvailable && (
                          <p className="mt-2 text-xs text-blue-600">
                            BNPL available
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}