"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ProductTabsProps {
  description: string;
  specs: Record<string, string>;
}

export default function ProductTabs({ description, specs }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs: Tab[] = [
    {
      id: "description",
      label: "Description",
      content: (
        <div className="prose prose-apple max-w-none">
          <p className="text-apple-gray-300 leading-relaxed">{description}</p>
        </div>
      ),
    },
    {
      id: "specs",
      label: "Specifications",
      content: (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="bg-apple-gray-100 rounded-xl p-4">
              <dt className="text-xs text-apple-gray-200 uppercase tracking-wider mb-1">{key}</dt>
              <dd className="font-medium text-apple-dark">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: "reviews",
      label: "Reviews",
      content: (
        <div className="text-center py-12">
          <p className="text-apple-gray-200">No reviews yet. Be the first to review!</p>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-12">
      {/* Tab buttons */}
      <div className="flex gap-8 border-b border-apple-gray">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-apple-dark"
                : "text-apple-gray-200 hover:text-apple-dark"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-apple-dark"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabs.find((t) => t.id === activeTab)?.content}
        </motion.div>
      </div>
    </div>
  );
}