"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, User, Mail, FileText, Check, Truck, Shield, RotateCcw, AlertCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// Delivery zones with pricing
const deliveryZones = [
  { id: "cbd", name: "Nairobi CBD", fee: 0, time: "Same day" },
  { id: "metro", name: "Nairobi Metro", fee: 300, time: "1-2 days" },
  { id: "kiambu", name: "Kiambu / Nakuru / Mombasa", fee: 500, time: "2-3 days" },
  { id: "other", name: "Other Counties", fee: 800, time: "4-6 days" },
];

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  zone: string;
  instructions: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    zone: "cbd",
    instructions: "",
  });

  const selectedZone = deliveryZones.find((z) => z.id === formData.zone) || deliveryZones[0];
  const finalTotal = totalPrice + selectedZone.fee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsComplete(true);
    clearCart();
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-white pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-24 h-24 bg-apple-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-12 h-12 text-apple-gray-200" />
          </div>
          <h1 className="text-2xl font-semibold text-apple-dark mb-2">Your cart is empty</h1>
          <p className="text-apple-gray-200 mb-6">Add some products to proceed to checkout</p>
          <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-white pt-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-semibold text-apple-dark mb-4">Order Confirmed!</h1>
          <p className="text-apple-gray-200 mb-2">Thank you for your order, {formData.fullName}.</p>
          <p className="text-apple-gray-200 mb-6">
            We'll send a confirmation to {formData.phone} and arrange delivery to {formData.address}.
          </p>
          <div className="bg-apple-gray-100 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-apple-dark mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-apple-gray-200">Order Total</span>
                <span className="font-medium">{formatPrice(finalTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-apple-gray-200">Payment Method</span>
                <span className="font-medium">Cash on Delivery</span>
              </div>
              <div className="flex justify-between">
                <span className="text-apple-gray-200">Delivery</span>
                <span className="font-medium">{selectedZone.name}</span>
              </div>
            </div>
          </div>
          <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-apple-dark mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-apple-gray-100 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-apple-dark mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-apple-dark mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-apple-gray-200 bg-white focus:border-apple-blue focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-apple-dark mb-1">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-gray-200" />
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-apple-gray-200 bg-white focus:border-apple-blue focus:outline-none transition-colors"
                          placeholder="0712345678"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-apple-dark mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-gray-200" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-apple-gray-200 bg-white focus:border-apple-blue focus:outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-apple-gray-100 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-apple-dark mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Delivery Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-apple-dark mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-apple-gray-200 bg-white focus:border-apple-blue focus:outline-none transition-colors"
                      placeholder="123 Kimathi Street, Nairobi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-apple-dark mb-1">Delivery Zone *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {deliveryZones.map((zone) => (
                        <label
                          key={zone.id}
                          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.zone === zone.id
                              ? "border-apple-blue bg-blue-50"
                              : "border-apple-gray-200 bg-white hover:border-apple-blue"
                          }`}
                        >
                          <input
                            type="radio"
                            name="zone"
                            value={zone.id}
                            checked={formData.zone === zone.id}
                            onChange={(e) => handleInputChange("zone", e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-apple-dark text-sm">{zone.name}</p>
                              <p className="text-xs text-apple-gray-200 mt-1">{zone.time}</p>
                            </div>
                            <span className="text-sm font-semibold text-apple-blue">
                              {zone.fee === 0 ? "Free" : formatPrice(zone.fee)}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-apple-dark mb-1">Delivery Instructions</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-5 h-5 text-apple-gray-200" />
                      <textarea
                        rows={3}
                        value={formData.instructions}
                        onChange={(e) => handleInputChange("instructions", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-apple-gray-200 bg-white focus:border-apple-blue focus:outline-none transition-colors resize-none"
                        placeholder="Gate code, landmark, or special instructions..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-apple-gray-100 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-apple-dark mb-4">Payment Method</h2>
                <div className="p-4 bg-white rounded-xl border-2 border-apple-blue">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">COD</span>
                    </div>
                    <div>
                      <p className="font-medium text-apple-dark">Cash on Delivery</p>
                      <p className="text-sm text-apple-gray-200">Pay when you receive your order</p>
                    </div>
                    <Check className="w-5 h-5 text-apple-blue ml-auto" />
                  </div>
                </div>
                <div className="mt-3 p-3 bg-amber-50 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    M-Pesa and card payments coming soon. Currently accepting cash on delivery only.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                Place Order - Pay {formatPrice(finalTotal)} on Delivery
              </Button>

              <div className="flex items-center justify-center gap-6 text-xs text-apple-gray-200">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" /> Secure Checkout
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-4 h-4" /> 7-Day Returns
                </span>
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-apple-gray-100 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-apple-dark mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-apple-blue text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-apple-dark text-sm line-clamp-2">{item.name}</p>
                      <p className="text-xs text-apple-gray-200">{item.category}</p>
                      <p className="font-semibold text-apple-dark mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-apple-gray pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-apple-gray-200">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-apple-gray-200">Delivery</span>
                  <span className="font-medium">
                    {selectedZone.fee === 0 ? "Free" : formatPrice(selectedZone.fee)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-apple-gray">
                  <span className="text-apple-dark">Total</span>
                  <span className="text-apple-dark">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl">
                <p className="text-xs text-apple-gray-200 text-center">
                  By placing this order, you agree to our{" "}
                  <a href="/terms" className="text-apple-blue hover:underline">Terms of Service</a> and{" "}
                  <a href="/privacy" className="text-apple-blue hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}