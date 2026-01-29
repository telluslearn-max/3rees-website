export interface CustomPlanConfig {
  minDepositRate: number;
  maxDepositRate: number;
  availablePeriods: number[];
  insuranceRate: number;
}

export interface CustomPlanResult {
  devicePrice: number;
  depositAmount: number;
  depositRate: number;
  financeAmount: number;
  monthlyPrincipal: number;
  insuranceMonthly: number;
  totalMonthlyPayment: number;
  period: number;
  totalCost: number;
}

export const CUSTOM_PLAN_CONFIG: CustomPlanConfig = {
  minDepositRate: 0.15,
  maxDepositRate: 0.70,
  availablePeriods: [1, 2, 3, 4, 5, 6],
  insuranceRate: 0.05
};