"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

export default function BNPLWidget() {
  return (
    <section className="section-large bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="apple-eyebrow text-blue-600">Buy Now, Pay Later</span>
            <h2 className="apple-headline text-4xl md:text-5xl mb-6">
              Get your device today.
              <br />
              <span className="text-gray-500">Pay over time.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Split your purchase into easy weekly payments. 40% deposit, balance spread over 
              3, 6, or 12 months. Available for iPhones, Samsung, Macs, iPads, TVs, and Starlink kits.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Choose your device</h4>
                  <p className="text-sm text-gray-500">Select from our premium refurbished collection</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">40% deposit</h4>
                  <p className="text-sm text-gray-500">Pay 40% upfront, collect your device immediately</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Weekly payments</h4>
                  <p className="text-sm text-gray-500">Pay the balance in easy weekly installments</p>
                </div>
              </div>
            </div>

            <Link href="/bnpl/" className="apple-button inline-flex">
              Check Your Eligibility
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-8 lg:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Payment Calculator</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Price (Ksh)</label>
                <input
                  type="number"
                  defaultValue="145000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <div className="grid grid-cols-3 gap-3">
                  {["3 months", "6 months", "12 months"].map((term) => (
                    <button
                      key={term}
                      className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium hover:border-blue-600 hover:bg-blue-50 transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Deposit (40%)</span>
                  <span className="font-semibold">Ksh 58,000</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Weekly payment</span>
                  <span className="font-semibold text-blue-600">Ksh 6,692</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total cost</span>
                  <span className="font-medium">Ksh 145,000</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Requirements:</span> 3-month M-Pesa statement, National ID, and next of kin contact.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}