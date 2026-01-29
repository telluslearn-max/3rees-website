"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calculator, Check, ChevronRight, Upload, Smartphone, Clock, Shield, CreditCard } from "lucide-react";
import { Provider, ClientType, InstallmentPeriod } from "@/types/bnpl";
import { calculateLoan, getWeeklyPayment } from "@/lib/bnplCalculator";
import { calculateCustomPlan, getMinDeposit, getMaxDeposit } from "@/lib/customPlanCalculator";
import { MIN_FINANCING_AMOUNT } from "@/types/bnpl";

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
  const [planType, setPlanType] = useState<'provider' | 'custom'>('provider');
  
  // Provider plan state
  const [provider, setProvider] = useState<Provider>('apple');
  const [clientType, setClientType] = useState<ClientType>('returning');
  
  // Custom plan state
  const [customDeposit, setCustomDeposit] = useState<string>('');
  const [customPeriod, setCustomPeriod] = useState<number>(3);
  const [customBreakdown, setCustomBreakdown] = useState<any>(null);
  const [customError, setCustomError] = useState<string>('');
  
  const [formData, setFormData] = useState({
    product: "",
    price: "",
    duration: "3",
    name: "",
    phone: "",
    email: "",
    idNumber: "",
    nextOfKin: "",
    nextOfKinPhone: ""
  });

  const calculateProviderBreakdown = () => {
    const price = parseInt(formData.price) || 0;
    const months = parseInt(formData.duration) as InstallmentPeriod;
    
    try {
      return calculateLoan(price, provider, months, clientType);
    } catch (e) {
      return null;
    }
  };

  const handleCustomDepositChange = (value: string) => {
    setCustomDeposit(value);
    const price = parseInt(formData.price) || 0;
    
    if (!value || !price) {
      setCustomBreakdown(null);
      setCustomError('');
      return;
    }

    try {
      const deposit = parseInt(value);
      const breakdown = calculateCustomPlan(price, deposit, customPeriod);
      setCustomBreakdown(breakdown);
      setCustomError('');
    } catch (err: any) {
      setCustomError(err.message);
      setCustomBreakdown(null);
    }
  };

  const handleCustomPeriodChange = (months: number) => {
    setCustomPeriod(months);
    const price = parseInt(formData.price) || 0;
    
    if (!customDeposit || !price) return;
    
    try {
      const deposit = parseInt(customDeposit);
      const breakdown = calculateCustomPlan(price, deposit, months);
      setCustomBreakdown(breakdown);
      setCustomError('');
    } catch (err: any) {
      setCustomError(err.message);
      setCustomBreakdown(null);
    }
  };

  const providerBreakdown = calculateProviderBreakdown();
  const weeklyPayment = providerBreakdown ? getWeeklyPayment(
    parseInt(formData.price) || 0, 
    provider, 
    parseInt(formData.duration) as InstallmentPeriod, 
    clientType
  ) : 0;

  const handleSubmit = () => {
    setStep(4);
  };

  const priceNum = parseInt(formData.price) || 0;
  const minCustomDeposit = priceNum > 0 ? getMinDeposit(priceNum) : 0;
  const maxCustomDeposit = priceNum > 0 ? getMaxDeposit(priceNum) : 0;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Buy Now, Pay Later</span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6">
              Get your device today.
              <br />
              <span className="text-gray-500">Pay over time.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Standard brand plans for any amount, or create your own custom plan.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-4 bg-white">
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

      <section className="py-24 px-4 bg-gray-50">
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

      <section className="py-24 px-4 bg-white">
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
                {/* Plan Type Toggle */}
                <div className="bg-gray-100 p-1 rounded-xl">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => setPlanType('provider')}
                      className={`py-3 rounded-lg text-sm font-medium transition-all ${
                        planType === 'provider'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Standard Plans
                      <span className="block text-xs font-normal opacity-75">Apple/Samsung/Vivo</span>
                    </button>
                    <button
                      onClick={() => setPlanType('custom')}
                      className={`py-3 rounded-lg text-sm font-medium transition-all ${
                        planType === 'custom'
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Custom Plan
                      <span className="block text-xs font-normal opacity-75">Choose your deposit</span>
                    </button>
                  </div>
                </div>

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

                {formData.price && parseInt(formData.price) > 0 && (
                  <>
                    {planType === 'provider' ? (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                          <div className="grid grid-cols-3 gap-3">
                            {(['apple', 'samsung', 'vivo'] as Provider[]).map((p) => (
                              <button
                                key={p}
                                onClick={() => setProvider(p)}
                                className={`py-2 rounded-xl border-2 font-medium capitalize transition-all ${
                                  provider === p 
                                    ? "border-blue-600 bg-blue-50 text-blue-600" 
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {provider === 'apple' && '2% insurance • 40-50% deposit'}
                            {provider === 'samsung' && '6-8% insurance • 40-50% deposit'}
                            {provider === 'vivo' && '5% insurance • 15-30% deposit (16% min)'}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Client Type</label>
                          <div className="flex gap-4">
                            <button
                              onClick={() => setClientType('returning')}
                              className={`flex-1 py-2 rounded-xl border-2 font-medium transition-all ${
                                clientType === 'returning'
                                  ? "border-green-600 bg-green-50 text-green-600"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              Returning Client
                            </button>
                            <button
                              onClick={() => setClientType('new')}
                              className={`flex-1 py-2 rounded-xl border-2 font-medium transition-all ${
                                clientType === 'new'
                                  ? "border-blue-600 bg-blue-50 text-blue-600"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              New Client
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Months)</label>
                          <div className="grid grid-cols-6 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((months) => (
                              <button
                                key={months}
                                onClick={() => setFormData({...formData, duration: months.toString()})}
                                className={`py-2 rounded-xl border-2 font-medium text-sm transition-all ${
                                  formData.duration === months.toString()
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                {months}
                              </button>
                            ))}
                          </div>
                          {clientType === 'new' && parseInt(formData.duration) >= 4 && provider === 'apple' && (
                            <p className="text-xs text-orange-600 mt-2">New clients pay 50% deposit for 4-6 month plans</p>
                          )}
                        </div>

                        {/* ALWAYS SHOW BREAKDOWN FOR STANDARD PLANS - NO MINIMUM CHECK */}
                        {providerBreakdown && (
                          <div className="bg-blue-50 rounded-xl p-6">
                            <h4 className="font-semibold mb-4">Payment Breakdown</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Product Price</span>
                                <span>Ksh {providerBreakdown.devicePrice.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Deposit ({providerBreakdown.depositRate}%)
                                  {provider === 'vivo' && providerBreakdown.depositRate === 16 && (
                                    <span className="ml-1 text-xs text-orange-600">(min 16%)</span>
                                  )}
                                </span>
                                <span className="font-semibold text-blue-600">Ksh {providerBreakdown.depositAmount.toLocaleString()}</span>     
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Monthly Insurance</span>
                                <span>Ksh {providerBreakdown.insuranceMonthly.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Principal</span>
                                <span>Ksh {providerBreakdown.monthlyPrincipal.toLocaleString()}/mo</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t">
                                <span className="text-gray-900 font-medium">Monthly Payment</span>
                                <span className="font-bold text-lg text-blue-600">Ksh {providerBreakdown.totalMonthlyPayment.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 pt-1">
                                <span>Weekly (approx)</span>
                                <span>Ksh {weeklyPayment.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs text-gray-400 pt-1">
                                <span>Total Cost</span>
                                <span>Ksh {providerBreakdown.totalCost.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm space-y-6">
                        {/* CUSTOM PLAN - MINIMUM CHECK APPLIES */}
                        {priceNum > 0 && priceNum < MIN_FINANCING_AMOUNT && (
                          <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-700 mb-4">
                            Minimum Ksh {MIN_FINANCING_AMOUNT.toLocaleString()} required for custom plans.
                            <br />
                            <span className="text-xs">Switch to Standard Plans for lower amounts.</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-purple-900 font-semibold mb-2">
                          <Calculator className="w-5 h-5" />
                          Custom Payment Plan
                        </div>
                        
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Your Deposit (KES) - Choose 15% to 70%
                          </label>
                          <input
                            type="number"
                            value={customDeposit}
                            onChange={(e) => handleCustomDepositChange(e.target.value)}
                            placeholder={`${minCustomDeposit.toLocaleString()} - ${maxCustomDeposit.toLocaleString()}`}
                            disabled={priceNum < MIN_FINANCING_AMOUNT}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Min: Ksh {minCustomDeposit.toLocaleString()} (15%)</span>
                            <span>Max: Ksh {maxCustomDeposit.toLocaleString()} (70%)</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <div className="grid grid-cols-6 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((m) => (
                              <button
                                key={m}
                                onClick={() => handleCustomPeriodChange(m)}
                                disabled={priceNum < MIN_FINANCING_AMOUNT}
                                className={`py-2 rounded-xl border-2 font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                  customPeriod === m
                                    ? "border-purple-600 bg-purple-50 text-purple-600"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>

                        {customError && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                            {customError}
                          </div>
                        )}

                        {customBreakdown && !customError && (
                          <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Deposit Rate</span>
                              <span className="font-semibold">{customBreakdown.depositRate}%</span>
                            </div>
                            <div className="flex justify-between items-center text-purple-600 bg-purple-50/50 px-3 py-2 rounded-lg">
                              <span>Your Deposit</span>
                              <span className="font-semibold">Ksh {customBreakdown.depositAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>Insurance (5%)</span>
                              <span>Ksh {customBreakdown.insuranceMonthly.toLocaleString()}/mo</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>Principal</span>
                              <span>Ksh {customBreakdown.monthlyPrincipal.toLocaleString()}/mo</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                              <span className="text-gray-900 font-semibold">Monthly Payment</span>
                              <span className="font-bold text-xl text-purple-600">
                                Ksh {customBreakdown.totalMonthlyPayment.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-400">
                              <span>Total Cost</span>
                              <span>Ksh {customBreakdown.totalCost.toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.product || !formData.price || (planType === 'custom' && (!customBreakdown || !!customError))}
                  className="w-full py-4 rounded-full bg-blue-600 text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Selected Plan</h4>
                  <div className="text-sm text-blue-800">
                    <p>Product: {formData.product}</p>
                    <p>Price: Ksh {parseInt(formData.price).toLocaleString()}</p>
                    {planType === 'provider' && providerBreakdown && (
                      <>
                        <p>Plan: Standard ({provider})</p>
                        <p>Deposit: Ksh {providerBreakdown.depositAmount.toLocaleString()} ({providerBreakdown.depositRate}%)</p>
                        <p>Duration: {formData.duration} months</p>
                      </>
                    )}
                    {planType === 'custom' && customBreakdown && (
                      <>
                        <p>Plan: Custom</p>
                        <p>Deposit: Ksh {customBreakdown.depositAmount.toLocaleString()} ({customBreakdown.depositRate}%)</p>
                        <p>Duration: {customPeriod} months</p>
                      </>
                    )}
                  </div>
                </div>

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
                      <span className="text-gray-600">Plan Type</span>
                      <span className="capitalize">{planType}</span>
                    </div>
                    {planType === 'provider' && providerBreakdown && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Provider</span>
                          <span className="capitalize">{provider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deposit ({providerBreakdown.depositRate}%)</span>
                          <span className="text-blue-600 font-medium">Ksh {providerBreakdown.depositAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Payment</span>
                          <span>Ksh {providerBreakdown.totalMonthlyPayment.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    {planType === 'custom' && customBreakdown && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Custom Deposit ({customBreakdown.depositRate}%)</span>
                          <span className="text-purple-600 font-medium">Ksh {customBreakdown.depositAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Payment</span>
                          <span>Ksh {customBreakdown.totalMonthlyPayment.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span>{planType === 'provider' ? formData.duration : customPeriod} months</span>
                    </div>
                  </div>
                </div>
                
                <a href="/shop/" className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
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