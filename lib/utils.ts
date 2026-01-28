import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `Ksh ${price.toLocaleString()}`;
}

export function calculateWeeklyPayment(price: number, months: number): number {
  const deposit = price * 0.4;
  const balance = price - deposit;
  const weeks = months * 4.33;
  return Math.round(balance / weeks);
}

export function calculateSavings(original: number, current: number): number {
  return original - current;
}