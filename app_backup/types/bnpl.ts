export type Provider = 'apple' | 'samsung' | 'vivo';
export type ClientType = 'new' | 'returning';
export type InstallmentPeriod = 1 | 2 | 3 | 4 | 5 | 6;

export interface BNPLBreakdown {
  devicePrice: number;
  depositAmount: number;
  depositRate: number;
  financeAmount: number;
  monthlyPrincipal: number;
  insuranceMonthly: number;
  totalMonthlyPayment: number;
  period: InstallmentPeriod;
  totalCost: number;
}

export const PROVIDER_CONFIGS = {
  apple: {
    minAmount: 51000,
    insuranceRate: 0.02,
    deposit: {
      returning: { 1: 0.40, 2: 0.40, 3: 0.40, 4: 0.40, 5: 0.40, 6: 0.40 },
      new: { 1: 0.40, 2: 0.40, 3: 0.40, 4: 0.50, 5: 0.50, 6: 0.50 }
    }
  },
  samsung: {
    minAmount: 41000,
    insuranceRate: 0.08,
    deposit: {
      returning: { 1: 0.40, 2: 0.40, 3: 0.40, 4: 0.40, 5: 0.45, 6: 0.50 },
      new: { 1: 0.40, 2: 0.40, 3: 0.40, 4: 0.50, 5: 0.50, 6: 0.50 }
    }
  },
  vivo: {
    minAmount: 3200,
    insuranceRate: 0.05,
    deposit: {
      returning: { 1: 0.15, 2: 0.20, 3: 0.25, 4: 0.30, 5: 0.30, 6: 0.30 },
      new: { 1: 0.20, 2: 0.25, 3: 0.30, 4: 0.30, 5: 0.30, 6: 0.30 }
    }
  }
};