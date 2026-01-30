"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calculator, Check, ChevronRight, Upload, Smartphone, Clock, Shield, CreditCard } from "lucide-react";

const eligibleProducts = [
  { category: "iPhones", minPrice: 40000, maxPrice: 200000 },
  { category: "Samsung Phones", minPrice: 30000, maxPrice: 180000 },
  { category: "MacBooks", minPrice: 80000, maxPrice: 300000 },
  { category: "iPads", minPrice: 35000, maxPrice: 150000 },
  { category: "TVs", minPrice: 25000, maxPrice: 200000 },
  { category: "Starlink Kits", minPrice: 35000, maxPrice: 60000 }
];

const requirements = [
  { icon: CreditCard, title: "3-Month M-Pesa Statement", desc: "Shows consistent income" },
  { icon: Shield, title: "National ID", desc: "Original ID required" },
  { icon: Smartphone, title: "Next of Kin Contact", desc: "Emergency contact number" },
  { icon: Clock, title: "Processing Time", desc: "Approval within 24 hours" }
];

export default function BNPLPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    product: "",
    price: "",
    duration: "12",
    name: "",
    phone: "",
    email: "",
    idNumber: "",
    nextOfKin: "",
    nextOfKinPhone: ""
  });

  const calculateWeekly = () => {
    const price = parseInt(formData.price) || 0;
    const deposit = price * 0.4;
    const balance = price - deposit;
    const weeks = parseInt(formData.duration) * 4.33;
    return Math.round(balance / weeks);
  };

  const handleSubmit = () => {
    setStep(4);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="apple-eyebrow text-blue-600">Buy Now, Pay Later</span>
            <h1 className="apple-headline text-5xl md:text-6xl mb-6">
              Get your device today.
              <br />
              <span className="text-gray-500">Pay over time.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              40% deposit, balance in weekly installments. No hidden fees.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section-medium bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Eligible Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {eligibleProducts.map((product, index) => (
              <motion.div
                key={product.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold mb-2">{product.category}</h3>
                <p className="text-sm text-gray-500">
                  Ksh {product.minPrice.toLocaleString()} - {product.maxPrice.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-medium bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">What You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <req.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{req.title}</h3>
                <p className="text-sm text-gray-600">{req.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-medium bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-semibold mb-8 text-center">Apply for BNPL</h2>
            
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step >= s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && <div className={`w-24 h-1 mx-2 ${step > s ? "bg-blue-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Product</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                  >
                    <option value="">Choose product category</option>
                    {eligibleProducts.map(p => (
                      <option key={p.category} value={p.category}>{p.category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Price (Ksh)</label>
                  <input
                    type="number"
                    placeholder="e.g. 145000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <div className="grid grid-cols-3 gap-4">
                    {["3", "6", "12"].map((months) => (
                      <button
                        key={months}
                        onClick={() => setFormData({...formData, duration: months})}
                        className={`py-3 rounded-xl border-2 font-medium transition-all ${formData.duration === months ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        {months} months
                      </button>
                    ))}
                  </div>
                </div>

                {formData.price && (
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Payment Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product Price</span>
                        <span>Ksh {parseInt(formData.price).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deposit (40%)</span>
                        <span className="font-semibold text-blue-600">Ksh {Math.round(parseInt(formData.price) * 0.4).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-600">Weekly Payment</span>
                        <span className="font-semibold text-lg">Ksh {calculateWeekly().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.product || !formData.price}
                  className="w-full py-4 rounded-full bg-blue-600 text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="07XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">National ID Number</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Next of Kin Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                      value={formData.nextOfKin}
                      onChange={(e) => setFormData({...formData, nextOfKin: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Next of Kin Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                      value={formData.nextOfKinPhone}
                      onChange={(e) => setFormData({...formData, nextOfKinPhone: e.target.value})}
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload M-Pesa Statement (3 months)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-600 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, CSV, or screenshot</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload National ID (Front & Back)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-600 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">Clear photo or scan</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Note:</span> You'll need to visit our CBD agent location for phone verification before collection.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-full border border-gray-200 font-medium hover:bg-gray-50">Back</button>
                  <button onClick={handleSubmit} className="flex-1 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700">Submit Application</button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Application Received!</h3>
                <p className="text-gray-600 mb-6">We'll review your application and get back to you within 24 hours via WhatsApp.</p>
                <div className="bg-gray-100 rounded-xl p-6 mb-6 text-left">
                  <h4 className="font-semibold mb-4">Application Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product</span>
                      <span>{formData.product}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Price</span>
                      <span>Ksh {parseInt(formData.price).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit</span>
                      <span className="text-blue-600 font-medium">Ksh {Math.round(parseInt(formData.price) * 0.4).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weekly Payment</span>
                      <span>Ksh {calculateWeekly().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <a href="/shop" className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                  Continue Shopping
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}