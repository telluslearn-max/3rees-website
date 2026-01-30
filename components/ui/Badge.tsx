"use client";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "new" | "sale" | "bnpl" | "trade-in" | "stock" | "custom";
  size?: "sm" | "md";
  customColor?: string;
}

export default function Badge({ 
  className, 
  variant = "new", 
  size = "sm",
  customColor,
  children,
  ...props 
}: BadgeProps) {
  const variants = {
    new: "bg-apple-blue text-white",
    sale: "bg-error text-white",
    bnpl: "bg-purple-100 text-purple-700 border-purple-200",
    "trade-in": "bg-green-100 text-green-700 border-green-200",
    stock: "bg-amber-100 text-amber-700 border-amber-200",
    custom: customColor || "bg-apple-gray text-apple-dark",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wider",
        variant !== "new" && variant !== "sale" ? "border" : "",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}