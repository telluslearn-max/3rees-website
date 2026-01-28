"use client";

import { motion } from "framer-motion";
import { Shield, Truck, RotateCcw, Headphones, Award, ThumbsUp } from "lucide-react";
import { trustStats } from "@/lib/data";

const guarantees = [
  { icon: Shield, title: "1 Year Warranty", description: "Every device covered by our comprehensive warranty with authorized service centers across Kenya." },
  { icon: Truck, title: "COD Nationwide", description: "Pay on delivery anywhere in Kenya. M-Pesa or cash accepted. Free delivery in Nairobi." },
  { icon: RotateCcw, title: "7-Day Returns", description: "Not satisfied? Return within 7 days for a full refund or exchange. No questions asked." },
  { icon: Headphones, title: "WhatsApp Support", description: "Direct line to our team. Pre-sale advice, order tracking, post-sale support." },
  { icon: Award, title: "Certified Quality", description: "72-point inspection by certified technicians. Battery health, functionality, cosmetics checked." },
  { icon: ThumbsUp, title: "15,000+ Happy Clients", description: "Join thousands of Kenyans who trust 3rees for premium refurbished electronics." }
];

export default function TrustSignals() {
  return (
    <section className="section-large bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-8 border-y border-gray-100"
        >
          {trustStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="apple-headline text-4xl md:text-5xl mb-4">Why 3rees?</h2>
          <p className="apple-subhead max-w-2xl mx-auto">Premium quality, transparent pricing, unmatched service.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guarantees.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}