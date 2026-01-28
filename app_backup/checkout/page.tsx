"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, Truck, MapPin, Phone, User, CreditCard, ChevronRight, Shield, Clock } from "lucide-react";

const cartItems = [
  { id: 1, name: "iPhone 15 Pro Max", price: 145000, condition: "Like New" },
  { id: 2, name: "AirPods Pro 2nd Gen", price: 28000, condition: "Like New" }
];

const deliveryZones = [
  { zone: "Nairobi CBD", cost: 0, time: "Same day" },
  { zone: "Nairobi Suburbs", cost: 300, time: "Same day" },
  { zone: "Mombasa", cost: 800, time: "1-2 days" },
  { zone: "Kisumu", cost: 800, time: "1-2 days" },
  { zone: "Nakuru", cost: 600, time: "1-2 days" },
  { zone: "Other Counties", cost: 1000, time: "2-3 days" }
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [selectedZone, setSelectedZone] = useState(deliveryZones[0]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    building: "",
    notes: ""
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + selectedZone.cost;

  const handleConfirm = () => {
    setOrderConfirmed(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

          {!orderConfirmed ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`flex items-center gap-2 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium hidden sm:block">Details</span>
                  </div>
                  <div className={`flex-1 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
                  <div className={`flex items-center gap-2 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium hidden sm:block">Delivery</span>
                  </div>
                  <div className={`flex-1 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`} />
                  <div className={`flex items-center gap-2 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium hidden sm:block">Confirm</span>
                  </div>
                </div>

                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                          placeholder="07XX XXX XXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                        <p className="text-xs text-gray-500 mt-1">We'll call to confirm before delivery</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email (optional)</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full mt-6 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700"
                    >
                      Continue to Delivery
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Zone</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {deliveryZones.map((zone) => (
                            <button
                              key={zone.zone}
                              onClick={() => setSelectedZone(zone)}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                selectedZone.zone === zone.zone ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium">{zone.zone}</div>
                              <div className="text-sm text-gray-500">
                                {zone.cost === 0 ? "Free" : `Ksh ${zone.cost}`} · {zone.time}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                          placeholder="123 Kimathi Street"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Building/Apartment (optional)</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                          placeholder="4th Floor, Suite 401"
                          value={formData.building}
                          onChange={(e) => setFormData({...formData, building: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Notes (optional)</label>
                        <textarea
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none resize-none"
                          rows={3}
                          placeholder="Landmark near your location..."
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-full border border-gray-200 font-medium hover:bg-gray-50">Back</button>
                      <button onClick={() => setStep(3)} className="flex-1 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700">Continue</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Confirm Order</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <User className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium">{formData.fullName}</p>
                          <p className="text-sm text-gray-500">{formData.phone}</p>
                          <p className="text-sm text-gray-500">{formData.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium">{selectedZone.zone}</p>
                          <p className="text-sm text-gray-500">{formData.address}</p>
                          {formData.building && <p className="text-sm text-gray-500">{formData.building}</p>}
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                        <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-600">Pay Ksh {total.toLocaleString()} when rider arrives</p>
                          <p className="text-xs text-gray-500 mt-1">M-Pesa or cash accepted</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                      <Shield className="w-4 h-4" />
                      <span>Your order is protected by our 7-day return policy</span>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-full border border-gray-200 font-medium hover:bg-gray-50">Back</button>
                      <button onClick={handleConfirm} className="flex-1 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700">Place Order</button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-400">IMG</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.condition}</p>
                          <p className="text-sm font-medium mt-1">Ksh {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>Ksh {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span>{selectedZone.cost === 0 ? "Free" : `Ksh ${selectedZone.cost}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                      <span>Total</span>
                      <span>Ksh {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-2 text-green-800 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Delivery: {selectedZone.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-3xl p-12 shadow-sm">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-semibold mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-8">Thank you for your order. We'll call you at {formData.phone} to confirm delivery details.</p>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold mb-4">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number</span>
                      <span className="font-medium">#3R{Math.floor(Math.random() * 100000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-medium">Ksh {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Delivery</span>
                      <span className="font-medium">{selectedZone.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/shop/" className="flex-1 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 text-center">Continue Shopping</Link>
                  <a href={`https://wa.me/254XXXXXXXXX?text=Hi, I just placed order #3R...`} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 rounded-full border border-green-600 text-green-600 font-medium hover:bg-green-600 hover:text-white text-center transition-colors">
                    Track on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}