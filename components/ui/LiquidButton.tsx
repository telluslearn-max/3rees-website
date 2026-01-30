// components/ui/LiquidButton.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SPRING_STANDARD, SPRING_PRO } from "@/hooks/useSpringPhysics";

type ButtonVariant = "primary" | "secondary" | "glass" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export default function LiquidButton({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  ...props
}: LiquidButtonProps) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  const variants = {
    primary: {
      background: "#0046BE",
      color: "white",
      boxShadow: "0 4px 14px 0 rgba(0, 70, 190, 0.39)",
    },
    secondary: {
      background: "rgba(0, 70, 190, 0.1)",
      color: "#0046BE",
      boxShadow: "none",
      border: "1px solid rgba(0, 70, 190, 0.2)",
    },
    glass: {
      background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%), rgba(0, 70, 190, 0.05)",
      color: "#1d1d1f",
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
      backdropFilter: "blur(30px) saturate(180%)",
    },
    ghost: {
      background: "transparent",
      color: "#0046BE",
      boxShadow: "none",
    },
  };

  const style = variants[variant];

  return (
    <motion.button
      disabled={disabled || isLoading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium overflow-hidden",
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        ...style,
        WebkitBackdropFilter: variant === "glass" ? "blur(30px) saturate(180%)" : undefined,
      }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={variant === "primary" ? SPRING_PRO : SPRING_STANDARD}
      {...props}
    >
      {/* Shine effect for primary */}
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
      )}

      {/* Loading spinner */}
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}

      {!isLoading && leftIcon}
      <span className="relative z-10">{children}</span>
      {!isLoading && rightIcon}
    </motion.button>
  );
}