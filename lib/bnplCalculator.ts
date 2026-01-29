import { Provider, ClientType, InstallmentPeriod, BNPLResult, PROVIDER_CONFIGS } from '@/types/bnpl';

export function calculateLoan(
  price: number,
  provider: Provider,
  months: InstallmentPeriod,
  client: ClientType
): BNPLResult {
  const config = PROVIDER_CONFIGS[provider];

  let depositRate = config.deposit[client][months];

  // Vivo: enforce 16% minimum deposit amount (device value protection)
  if (provider === 'vivo') {
    const minDepositAmount = price * 0.16;
    const calculatedDeposit = price * depositRate;
    if (calculatedDeposit < minDepositAmount) {
      depositRate = 0.16;
    }
  }

  const depositAmount = Math.round(price * depositRate);
  const financeAmount = price - depositAmount;
  const monthlyPrincipal = Math.round(financeAmount / months);
  const insuranceMonthly = Math.round(financeAmount * config.insuranceRate);
  const totalMonthlyPayment = monthlyPrincipal + insuranceMonthly;

  return {
    devicePrice: price,
    depositAmount,
    depositRate: Math.round(depositRate * 100),
    financeAmount,
    monthlyPrincipal,
    insuranceMonthly,
    totalMonthlyPayment,
    period: months,
    totalCost: depositAmount + (totalMonthlyPayment * months)
  };
}

export function getWeeklyPayment(price: number, provider: Provider, months: InstallmentPeriod, client: ClientType): number {
  const monthly = calculateLoan(price, provider, months, client).totalMonthlyPayment;
  return Math.round(monthly / 4.33);
}