"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Check, Info } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface BNPLPlan {
  name: string;
  deposit: number;
  duration: number;
  interest: number;
  minAmount: number;
}

const bnplPlans: BNPLPlan[] = [
  { name: "Apple", deposit: 0.4, duration: 6, interest: 0.02, minAmount: 51000 },
  { name: "Samsung", deposit: 0.4, duration: 6, interest: 0.06, minAmount: 41000 },
  { name: "Vivo", deposit: 0.2, duration: 3, interest: 0, minAmount: 3200 },
];

interface BNPLWidgetProps {
  price: number;
}

export default function BNPLWidget({ price }: BNPLWidgetProps) {
  const [selectedPlan, setSelectedPlan] = useState<BNPLPlan>(bnplPlans[0]);
  const [showCalculator, setShowCalculator] = useState(false);

  const calculatePayment = (plan: BNPLPlan) => {
    const depositAmount = price * plan.deposit;
    const balance = price - depositAmount;
    const monthlyInterest = plan.interest;
    const totalInterest = balance * monthlyInterest * plan.duration;
    const total = balance + totalInterest;
    const monthly = total / plan.duration;
    
    return {
      deposit: depositAmount,
      monthly: Math.round(monthly),
      total: Math.round(total + depositAmount),
    };
  };

  const payment = calculatePayment(selectedPlan);
  const isEligible = price >= selectedPlan.minAmount;

  return (
    <div className="bg-apple-gray-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-apple-blue" />
        <h3 className="font-semibold text-apple-dark">Buy Now, Pay Later</h3>
      </div>

      {/* Plan selector */}
      <div className="flex gap-2">
        {bnplPlans.map((plan) => (
          <button
            key={plan.name}
            onClick={() => setSelectedPlan(plan)}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
              selectedPlan.name === plan.name
                ? "bg-apple-blue text-white"
                : "bg-white text-apple-dark hover:bg-apple-gray"
            )}
          >
            {plan.name}
          </button>
        ))}
      </div>

      {!isEligible && (
        <p className="text-sm text-error flex items-center gap-1">
          <Info className="w-4 h-4" />
          Min. amount: {formatPrice(selectedPlan.minAmount)}
        </p>
      )}

      {isEligible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-apple-gray-200 mb-1">Deposit today</p>
              <p className="text-lg font-semibold text-apple-dark">
                {formatPrice(payment.deposit)}
              </p>
              <p className="text-xs text-apple-gray-200">
                ({Math.round(selectedPlan.deposit * 100)}%)
              </p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-apple-gray-200 mb-1">
                {selectedPlan.duration} monthly payments
              </p>
              <p className="text-lg font-semibold text-apple-blue">
                {formatPrice(payment.monthly)}
              </p>
              <p className="text-xs text-apple-gray-200">
                {selectedPlan.interest > 0 ? `Includes ${selectedPlan.interest * 100}% insurance` : "0% interest"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-apple-gray-200">Total cost</span>
            <span className="font-semibold text-apple-dark">
              {formatPrice(payment.total)}
            </span>
          </div>

          <Button className="w-full" variant="secondary">
            Pre-qualify with {selectedPlan.name}
          </Button>
        </motion.div>
      )}

      <p className="text-xs text-apple-gray-200 text-center">
        Subject to approval. Terms apply.
      </p>
    </div>
  );
}