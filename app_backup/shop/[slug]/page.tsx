"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionBadge from "@/components/ui/ConditionBadge";
import { products } from "@/lib/data";
import { Shield, Truck, RotateCcw, MessageCircle, Check, ChevronRight, Battery, Cpu, HardDrive, Smartphone } from "lucide-react";

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug) || products[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBNPLModal, setShowBNPLModal] = useState(false);
  const [showTradeInModal, setShowTradeInModal] = useState(false);

  const images = [product.image, product.image, product.image];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-black">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-black">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-black">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden relative">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
                <div className="absolute top-4 left-4">
                  <ConditionBadge condition={product.condition} size="md" />
                </div>
              </div>
              <div className="flex gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? "border-blue-600" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-2 bg-gray-50" />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-semibold">Ksh {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      Ksh {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-green-600 font-medium">
                      Save Ksh {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-4 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  1 Year Warranty
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-blue-500" />
                  Free Delivery Nairobi
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RotateCcw className="w-4 h-4 text-orange-500" />
                  7-Day Returns
                </div>
              </div>

              {product.specs && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      {key === "Battery" && <Battery className="w-5 h-5 text-gray-400" />}
                      {key === "Chip" && <Cpu className="w-5 h-5 text-gray-400" />}
                      {key === "Storage" && <HardDrive className="w-5 h-5 text-gray-400" />}
                      {key === "Display" && <Smartphone className="w-5 h-5 text-gray-400" />}
                      <div>
                        <p className="text-xs text-gray-500">{key}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                <button className="w-full apple-button py-4 text-base">
                  Add to Cart - COD Available
                </button>
                
                {product.bnplAvailable && (
                  <button 
                    onClick={() => setShowBNPLModal(true)}
                    className="w-full apple-button-secondary border-blue-600 text-blue-600"
                  >
                    Pay with BNPL (40% Deposit)
                  </button>
                )}
                
                {product.tradeInAvailable && (
                  <button 
                    onClick={() => setShowTradeInModal(true)}
                    className="w-full py-4 rounded-full border border-green-500 text-green-600 font-medium hover:bg-green-50 transition-colors"
                  >
                    Trade In Your Old Device
                  </button>
                )}
              </div>

              <a 
                href="https://wa.me/254XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Questions? Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {showBNPLModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-semibold mb-4">Buy Now, Pay Later</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Device Price</span>
                <span className="font-semibold">Ksh {product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Deposit (40%)</span>
                <span className="font-semibold text-blue-600">Ksh {Math.round(product.price * 0.4).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Weekly (12 months)</span>
                <span className="font-semibold">Ksh {Math.round(product.price * 0.6 / 52).toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Requires: 3-month M-Pesa statement, National ID, Next of kin contact
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowBNPLModal(false)}
                className="flex-1 py-3 rounded-full border border-gray-200 font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 rounded-full bg-blue-600 text-white font-medium">
                Apply Now
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showTradeInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-semibold mb-2">Trade In Value</h3>
            <p className="text-gray-600 mb-6">Get instant credit for your old device</p>
            
            <div className="space-y-4 mb-6">
              <select className="w-full p-3 rounded-xl border border-gray-200">
                <option>Select your device</option>
                <option>iPhone 14 Pro</option>
                <option>iPhone 13</option>
                <option>Samsung S23</option>
              </select>
              <select className="w-full p-3 rounded-xl border border-gray-200">
                <option>Condition</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-800 mb-1">Estimated Trade-in Value</p>
              <p className="text-3xl font-bold text-green-600">Ksh 35,000</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowTradeInModal(false)}
                className="flex-1 py-3 rounded-full border border-gray-200 font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 rounded-full bg-green-600 text-white font-medium">
                Get Final Quote
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}