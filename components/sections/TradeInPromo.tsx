"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Smartphone, Laptop, Gamepad2, Calculator } from "lucide-react";

const tradeInCategories = [
  { icon: Smartphone, title: "Phones", description: "iPhone, Samsung, Xiaomi", value: "Up to Ksh 85,000" },
  { icon: Laptop, title: "Laptops", description: "MacBook, Windows laptops", value: "Up to Ksh 120,000" },
  { icon: Gamepad2, title: "Consoles", description: "PlayStation, Xbox, Nintendo", value: "Up to Ksh 35,000" }
];

export default function TradeInPromo() {
  return (
    <section className="section-large bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="apple-eyebrow text-green-600">Trade In</span>
            <h2 className="apple-headline text-4xl md:text-5xl mb-6">
              Turn your device
              <br />
              <span className="text-gray-500">into credit.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Trade in your old phone, laptop, or console and get instant credit toward your next purchase. 
              Online quote, rider pickup, instant value. It's that simple.
            </p>

            <div className="space-y-4 mb-8">
              {tradeInCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{category.title}</h4>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{category.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/trade-in/" className="apple-button bg-green-600 hover:bg-green-700">
                Get Trade-In Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href="/shop" className="apple-button-secondary border-green-600 text-green-600 hover:bg-green-600">
                Shop with Trade-In
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold">Instant Quote</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Type</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all bg-white">
                  <option>Select category</option>
                  <option>iPhone</option>
                  <option>Samsung</option>
                  <option>MacBook</option>
                  <option>Windows Laptop</option>
                  <option>iPad</option>
                  <option>PlayStation</option>
                  <option>Xbox</option>
                  <option>Nintendo Switch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all bg-white">
                  <option>Select model</option>
                  <option>iPhone 15 Pro Max</option>
                  <option>iPhone 14 Pro</option>
                  <option>iPhone 13</option>
                  <option>Galaxy S24 Ultra</option>
                  <option>MacBook Pro M3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Like New", "Good", "Fair", "Poor"].map((condition) => (
                    <button
                      key={condition}
                      className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium hover:border-green-500 hover:bg-green-50 transition-all text-left"
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Estimated value</span>
                  <span className="text-3xl font-bold text-green-600">Ksh 45,000</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Final value confirmed after physical inspection</p>
                <button className="w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
                  Schedule Pickup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}