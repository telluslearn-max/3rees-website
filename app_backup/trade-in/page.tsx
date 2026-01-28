"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Smartphone, Laptop, Gamepad2, Tablet, ArrowRight, Check, Truck, Clock, Shield } from "lucide-react";

const deviceTypes = [
  { icon: Smartphone, name: "Smartphone", brands: ["iPhone", "Samsung", "Xiaomi", "Google Pixel"] },
  { icon: Laptop, name: "Laptop", brands: ["MacBook", "Windows Laptop", "Chromebook"] },
  { icon: Tablet, name: "Tablet", brands: ["iPad", "Samsung Tab", "Microsoft Surface"] },
  { icon: Gamepad2, name: "Gaming Console", brands: ["PlayStation", "Xbox", "Nintendo Switch"] }
];

const howItWorks = [
  { icon: Smartphone, title: "Get Quote", description: "Tell us about your device. Get an instant estimated value online." },
  { icon: Truck, title: "Rider Pickup", description: "We send a rider to collect your device from your location. Free in Nairobi." },
  { icon: Clock, title: "Inspection", description: "Our technicians verify condition within 24 hours." },
  { icon: Shield, title: "Get Paid", description: "Receive M-Pesa payment or credit toward your new device." }
];

export default function TradeInPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [condition, setCondition] = useState("");
  const [quote, setQuote] = useState<number | null>(null);

  const calculateQuote = () => {
    const baseValue = 50000;
    const conditionMultiplier = 
      condition === "Like New" ? 0.9 :
      condition === "Good" ? 0.7 :
      condition === "Fair" ? 0.5 : 0.3;
    setQuote(Math.round(baseValue * conditionMultiplier));
    setStep(5);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="apple-eyebrow text-green-600">Trade In</span>
            <h1 className="apple-headline text-5xl md:text-6xl mb-6">
              Turn your old device
              <br />
              <span className="text-gray-500">into instant value.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trade in your phone, laptop, tablet, or console and get instant credit toward your next purchase.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section-medium bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-medium bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
            <h2 className="text-2xl font-semibold mb-8 text-center">Get Your Quote</h2>
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <p className="text-center text-gray-600 mb-6">What type of device do you have?</p>
                <div className="grid grid-cols-2 gap-4">
                  {deviceTypes.map((type) => (
                    <button
                      key={type.name}
                      onClick={() => { setSelectedType(type.name); setStep(2); }}
                      className="p-6 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all text-center"
                    >
                      <type.icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                      <span className="font-medium">{type.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <p className="text-center text-gray-600 mb-6">Select brand</p>
                <div className="grid grid-cols-2 gap-4">
                  {deviceTypes.find(t => t.name === selectedType)?.brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => { setSelectedBrand(brand); setStep(3); }}
                      className="p-4 rounded-xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-6 text-sm text-gray-500 hover:text-black">← Back</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <p className="text-center text-gray-600 mb-6">Select model</p>
                <div className="space-y-3">
                  {["iPhone 15 Pro Max", "iPhone 14 Pro", "iPhone 13", "iPhone 12"].map((model) => (
                    <button
                      key={model}
                      onClick={() => { setSelectedModel(model); setStep(4); }}
                      className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all text-left flex justify-between items-center"
                    >
                      {model}
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="mt-6 text-sm text-gray-500 hover:text-black">← Back</button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <p className="text-center text-gray-600 mb-6">What condition is it in?</p>
                <div className="space-y-3">
                  {[
                    { label: "Like New", desc: "No scratches, works perfectly" },
                    { label: "Good", desc: "Minor wear, fully functional" },
                    { label: "Fair", desc: "Visible wear, works well" },
                    { label: "Poor", desc: "Heavy wear, some issues" }
                  ].map((cond) => (
                    <button
                      key={cond.label}
                      onClick={() => { setCondition(cond.label); calculateQuote(); }}
                      className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all text-left"
                    >
                      <div className="font-medium">{cond.label}</div>
                      <div className="text-sm text-gray-500">{cond.desc}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(3)} className="mt-6 text-sm text-gray-500 hover:text-black">← Back</button>
              </motion.div>
            )}

            {step === 5 && quote && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Your Estimated Quote</h3>
                <div className="text-5xl font-bold text-green-600 mb-6">Ksh {quote.toLocaleString()}</div>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Device</span>
                    <span className="font-medium">{selectedModel}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Condition</span>
                    <span className="font-medium">{condition}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Estimated Value</span>
                    <span className="font-medium text-green-600">Ksh {quote.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 py-4 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
                    Schedule Pickup
                  </button>
                  <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-full border border-gray-200 font-medium hover:bg-gray-50">
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}

            {step < 5 && (
              <div className="flex justify-center gap-2 mt-8">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`w-2 h-2 rounded-full transition-colors ${s === step ? "bg-green-600" : s < step ? "bg-green-300" : "bg-gray-200"}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}