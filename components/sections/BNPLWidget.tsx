"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { Provider, ClientType } from "@/types/bnpl";
import { calculateLoan } from "@/lib/loanCalculator";

export default function BNPLWidget() {
  const [provider, setProvider] = useState<Provider>('apple');
  const [clientType, setClientType] = useState<ClientType>('returning');
  const [price, setPrice] = useState<string>('145000');
  const [months, setMonths] = useState<string>('3');

  const monthsNum = parseInt(months) as 1|2|3|4|5|6;
  const priceNum = parseInt(price) || 0;
  
  let breakdown = null;
  let error = '';
  
  try {
    breakdown = calculateLoan(priceNum, provider, monthsNum, clientType);
  } catch (e: any) {
    error = e.message;
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Buy Now, Pay Later</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Get your device today.
              <br />
              <span className="text-gray-500">Pay over time.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Split your purchase into flexible monthly payments with insurance included. 
              Choose your deposit amount and duration. Instant approval.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Choose your device</h4>
                  <p className="text-sm text-gray-500">Select from iPhones, Samsung, Vivo & more</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Select your plan</h4>
                  <p className="text-sm text-gray-500">Choose deposit (15-50%) and 1-6 month duration</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Monthly payments</h4>
                  <p className="text-sm text-gray-500">Pay via M-Pesa with insurance included</p>
                </div>
              </div>
            </div>

            <Link 
              href="/bnpl/" 
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
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

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['apple', 'samsung', 'vivo'] as Provider[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setProvider(p)}
                      className={`py-2 px-3 rounded-xl text-sm font-medium capitalize transition-all ${
                        provider === p
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (Ksh)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Months</label>
                  <select
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((m) => (
                      <option key={m} value={m}>{m} months</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Type</label>
                <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-200">
                  <button
                    onClick={() => setClientType('returning')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      clientType === 'returning'
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Returning
                  </button>
                  <button
                    onClick={() => setClientType('new')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      clientType === 'new'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    New
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
              {breakdown ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Deposit ({breakdown.depositRate}%)
                      {provider === 'vivo' && breakdown.depositRate === 16 && (
                        <span className="ml-1 text-xs text-orange-600">(min)</span>
                      )}
                    </span>
                    <span className="font-semibold text-lg">
                      Ksh {breakdown.depositAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  {clientType === 'new' && monthsNum >= 4 && provider === 'apple' && (
                    <p className="text-xs text-orange-600 text-right">New client rate: 50%</p>
                  )}
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-900 font-medium">Monthly Payment</span>
                    <span className="font-bold text-2xl text-blue-600">
                      Ksh {breakdown.totalMonthlyPayment.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Includes insurance ({provider === 'apple' ? '2%' : provider === 'samsung' ? '8%' : '5%'})</span>
                    <span>Total: Ksh {breakdown.totalCost.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="text-red-600 text-sm">
                  Minimum Ksh {provider === 'apple' ? '51,000' : provider === 'samsung' ? '41,000' : '3,200'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}