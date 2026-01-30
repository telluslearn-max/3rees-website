"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

const filterGroups: FilterGroup[] = [
  {
    id: "category",
    name: "Category",
    options: [
      { id: "iphone", label: "iPhone", count: 45 },
      { id: "mac", label: "Mac", count: 32 },
      { id: "ipad", label: "iPad", count: 28 },
      { id: "samsung", label: "Samsung", count: 56 },
      { id: "gaming", label: "Gaming", count: 89 },
      { id: "starlink", label: "Starlink", count: 12 },
      { id: "accessories", label: "Accessories", count: 134 },
    ],
  },
  {
    id: "price",
    name: "Price Range",
    options: [
      { id: "0-50000", label: "Under KSh 50,000" },
      { id: "50000-100000", label: "KSh 50,000 - 100,000" },
      { id: "100000-150000", label: "KSh 100,000 - 150,000" },
      { id: "150000+", label: "Above KSh 150,000" },
    ],
  },
  {
    id: "condition",
    name: "Condition",
    options: [
      { id: "like-new", label: "Like New", count: 15 },
      { id: "excellent", label: "Excellent", count: 28 },
      { id: "good", label: "Good", count: 22 },
      { id: "fair", label: "Fair", count: 8 },
    ],
  },
];

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["category", "price"]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-apple-dark">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-apple-blue hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {filterGroups.map((group) => (
        <div key={group.id} className="border-b border-apple-gray pb-6 last:border-0">
          <button
            onClick={() => toggleGroup(group.id)}
            className="flex items-center justify-between w-full py-2"
          >
            <span className="font-medium text-sm text-apple-dark">{group.name}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-apple-gray-200 transition-transform duration-200",
                expandedGroups.includes(group.id) && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {expandedGroups.includes(group.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3 space-y-2">
                  {group.options.map((option) => {
                    const isSelected = selectedFilters[group.id]?.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                            isSelected
                              ? "bg-apple-blue border-apple-blue"
                              : "border-apple-gray-200 group-hover:border-apple-blue"
                          )}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isSelected}
                          onChange={() => onFilterChange(group.id, option.id)}
                        />
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            isSelected
                              ? "text-apple-dark font-medium"
                              : "text-apple-gray-300"
                          )}
                        >
                          {option.label}
                        </span>
                        {option.count && (
                          <span className="text-xs text-apple-gray-200 ml-auto">
                            ({option.count})
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <FilterContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 p-6 overflow-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-apple-dark">Filters</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-apple-gray rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
              <div className="sticky bottom-0 pt-4 bg-white border-t border-apple-gray mt-6">
                <Button className="w-full" onClick={onClose}>
                  Show Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}