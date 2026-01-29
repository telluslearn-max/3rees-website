import { CustomPlanResult, CUSTOM_PLAN_CONFIG } from '@/types/customPlan';
import { MIN_FINANCING_AMOUNT } from '@/types/bnpl';

export function calculateCustomPlan(
  devicePrice: number,
  depositAmount: number,
  months: number
): CustomPlanResult {
  // Custom plans have minimum financing amount requirement
  if (devicePrice < MIN_FINANCING_AMOUNT) {
    throw new Error(`Minimum device value for custom plans is KES ${MIN_FINANCING_AMOUNT.toLocaleString()}`);
  }

  const config = CUSTOM_PLAN_CONFIG;
  
  const minDeposit = Math.round(devicePrice * config.minDepositRate);
  const maxDeposit = Math.round(devicePrice * config.maxDepositRate);
  
  if (depositAmount < minDeposit) {
    throw new Error(`Minimum deposit is KES ${minDeposit.toLocaleString()} (15%)`);
  }
  
  if (depositAmount > maxDeposit) {
    throw new Error(`Maximum deposit is KES ${maxDeposit.toLocaleString()} (70%)`);
  }
  
  if (!config.availablePeriods.includes(months)) {
    throw new Error('Duration must be 1-6 months');
  }

  const financeAmount = devicePrice - depositAmount;
  const monthlyPrincipal = Math.round(financeAmount / months);
  const insuranceMonthly = Math.round(financeAmount * config.insuranceRate);
  const totalMonthlyPayment = monthlyPrincipal + insuranceMonthly;

  return {
    devicePrice,
    depositAmount,
    depositRate: Math.round((depositAmount / devicePrice) * 100),
    financeAmount,
    monthlyPrincipal,
    insuranceMonthly,
    totalMonthlyPayment,
    period: months,
    totalCost: depositAmount + (totalMonthlyPayment * months)
  };
}

export function getMinDeposit(price: number): number {
  return Math.round(price * 0.15);
}

export function getMaxDeposit(price: number): number {
  return Math.round(price * 0.70);
}