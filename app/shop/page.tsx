"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSidebar from "@/components/product/FilterSidebar";
import Button from "@/components/ui/Button";
import { products } from "@/lib/data";

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = useState<2 | 3 | 4>(4);

  const handleFilterChange = (groupId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const current = prev[groupId] || [];
      const updated = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      return { ...prev, [groupId]: updated };
    });
  };

  const clearFilters = () => setSelectedFilters({});

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedFilters.category?.length > 0) {
        if (!selectedFilters.category.includes(product.category.toLowerCase())) {
          return false;
        }
      }
      
      if (selectedFilters.price?.length > 0) {
        const priceMatch = selectedFilters.price.some(range => {
          if (range === "0-50000") return product.price < 50000;
          if (range === "50000-100000") return product.price >= 50000 && product.price < 100000;
          if (range === "100000-150000") return product.price >= 100000 && product.price < 150000;
          if (range === "150000+") return product.price >= 150000;
          return true;
        });
        if (!priceMatch) return false;
      }

      if (selectedFilters.condition?.length > 0) {
        if (!selectedFilters.condition.includes(product.condition.toLowerCase().replace(" ", "-"))) {
          return false;
        }
      }

      return true;
    });
  }, [selectedFilters]);

  const activeFilterCount = Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <div className="min-h-screen bg-white pt-14">
      <div className="border-b border-apple-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-apple-dark mb-4">Store</h1>
          <p className="text-lg md:text-xl text-apple-gray-200 max-w-2xl">
            Premium refurbished electronics with 1-year warranty. 
            Trade-in your old device and save up to 30%.
          </p>
        </div>
      </div>

      <div className="sticky top-14 z-30 bg-white/80 backdrop-blur-xl border-b border-apple-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden"
            >
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>

            <span className="hidden lg:inline text-sm text-apple-gray-200">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
            
            {activeFilterCount > 0 && (
              <button 
                onClick={clearFilters} 
                className="hidden lg:inline text-sm text-apple-blue hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-apple-gray-200 hidden sm:inline">View:</span>
            <div className="flex bg-apple-gray rounded-lg p-1">
              <button
                onClick={() => setViewMode(4)}
                className={`p-2 rounded-md transition-colors ${viewMode === 4 ? "bg-white shadow-sm" : "hover:bg-white/50"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode(3)}
                className={`p-2 rounded-md transition-colors ${viewMode === 3 ? "bg-white shadow-sm" : "hover:bg-white/50"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode(2)}
                className={`p-2 rounded-md transition-colors ${viewMode === 2 ? "bg-white shadow-sm" : "hover:bg-white/50"}`}
              >
                <LayoutGrid className="w-4 h-4 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
          
          <main className="flex-1">
            <div className="lg:hidden mb-4 flex items-center justify-between">
              <span className="text-sm text-apple-gray-200">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-sm text-apple-blue">
                  Clear all
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-apple-gray-200 text-lg mb-4">No products found</p>
                <Button variant="secondary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} columns={viewMode} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}