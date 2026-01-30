"use client";

import { forwardRef } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const variants = {
      primary: "bg-apple-blue text-white hover:bg-apple-blue-hover active:scale-[0.98]",
      secondary: "bg-transparent text-apple-blue border border-apple-blue hover:bg-apple-blue hover:text-white active:scale-[0.98]",
      ghost: "bg-transparent text-apple-dark hover:bg-apple-gray active:bg-apple-gray/80",
      danger: "bg-error text-white hover:bg-red-600 active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-10 w-10 p-2",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium",
          "transition-all duration-200 ease-apple",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-apple-blue",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;