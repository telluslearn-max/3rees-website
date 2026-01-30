"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ArrowRight, Check, RefreshCw } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ConditionBadge from "@/components/ui/ConditionBadge";

const deviceModels = [
  { name: "iPhone 14 Pro", maxValue: 45000 },
  { name: "iPhone 13 Pro", maxValue: 35000 },
  { name: "iPhone 12 Pro", maxValue: 25000 },
  { name: "Samsung S23 Ultra", maxValue: 40000 },
  { name: "Samsung S22 Ultra", maxValue: 30000 },
];

const conditions = [
  { type: "Like New" as const, multiplier: 1.0 },
  { type: "Excellent" as const, multiplier: 0.85 },
  { type: "Good" as const, multiplier: 0.7 },
  { type: "Fair" as const, multiplier: 0.5 },
];

interface TradeInWidgetProps {
  currentProductPrice: number;
}

export default function TradeInWidget({ currentProductPrice }: TradeInWidgetProps) {
  const [selectedModel, setSelectedModel] = useState(deviceModels[0]);
  const [selectedCondition, setSelectedCondition] = useState(conditions[1]);
  const [step, setStep] = useState<"select" | "quote">("select");

  const tradeInValue = Math.round(selectedModel.maxValue * selectedCondition.multiplier);
  const finalPrice = currentProductPrice - tradeInValue;

  return (
    <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
      <div className="flex items-center gap-2 mb-4">
        <RefreshCw className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-green-800">Trade-in & Save</h3>
      </div>

      <AnimatePresence mode="wait">
        {step === "select" ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-green-700 mb-2 block">Your current device</label>
              <select
                value={selectedModel.name}
                onChange={(e) => setSelectedModel(deviceModels.find(m => m.name === e.target.value)!)}
                className="w-full p-3 rounded-xl border border-green-200 bg-white text-apple-dark focus:border-green-500 focus:outline-none"
              >
                {deviceModels.map((model) => (
                  <option key={model.name} value={model.name}>
                    {model.name} (up to {formatPrice(model.maxValue)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-green-700 mb-2 block">Condition</label>
              <div className="flex flex-wrap gap-2">
                {conditions.map((cond) => (
                  <button
                    key={cond.type}
                    onClick={() => setSelectedCondition(cond)}
                    className={cn(
                      "transition-all",
                      selectedCondition.type === cond.type ? "ring-2 ring-green-500 ring-offset-2 rounded-full" : ""
                    )}
                  >
                    <ConditionBadge condition={cond.type} size="sm" />
                  </button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep("quote")}
            >
              Get instant quote
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="quote"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-sm text-apple-gray-200 mb-1">Your trade-in value</p>
              <p className="text-3xl font-bold text-green-600">{formatPrice(tradeInValue)}</p>
              <p className="text-xs text-apple-gray-200 mt-1">
                {selectedModel.name} • {selectedCondition.type}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-apple-gray-200">New device</span>
                <span className="text-apple-dark">{formatPrice(currentProductPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-apple-gray-200">Trade-in credit</span>
                <span className="text-green-600">-{formatPrice(tradeInValue)}</span>
              </div>
              <div className="border-t border-green-200 pt-2 flex justify-between">
                <span className="font-medium text-apple-dark">You pay</span>
                <span className="text-xl font-bold text-green-700">{formatPrice(finalPrice)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={() => setStep("select")}
              >
                Back
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                Apply trade-in
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}