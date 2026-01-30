"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-apple-gray">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-apple-dark" />
                <h2 className="text-lg font-semibold text-apple-dark">
                  Your Cart ({totalItems})
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-apple-gray rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-apple-gray-200 mx-auto mb-4" />
                  <p className="text-apple-gray-200">Your cart is empty</p>
                  <Button 
                    variant="secondary" 
                    className="mt-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <Link href={`/product/${item.slug}`} onClick={() => setIsOpen(false)}>
                        <div className="relative w-20 h-20 bg-apple-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.slug}`} onClick={() => setIsOpen(false)}>
                          <h3 className="font-medium text-apple-dark truncate hover:text-apple-blue transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-apple-gray-200">{item.category}</p>
                        <p className="font-semibold text-apple-dark mt-1">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-apple-gray hover:bg-apple-gray transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-apple-gray hover:bg-apple-gray transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-apple-gray-200 hover:text-error transition-colors self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-apple-gray p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-apple-dark">Total</span>
                  <span className="text-apple-dark">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-apple-gray-200">
                  Shipping and taxes calculated at checkout
                </p>
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" size="lg">
                    Checkout
                  </Button>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-sm text-apple-blue hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}