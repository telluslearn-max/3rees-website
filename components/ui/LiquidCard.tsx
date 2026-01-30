// components/ui/LiquidCard.tsx
"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { SPRING_STANDARD, SPRING_PRO } from "@/hooks/useSpringPhysics";

type LiquidVariant = "standard" | "pro" | "minimal";
type LiquidSize = "sm" | "md" | "lg" | "xl" | "full";

interface LiquidCardProps extends Omit<HTMLMotionProps<"div">, "size"> {
  variant?: LiquidVariant;
  size?: LiquidSize;
  children: React.ReactNode;
  hover?: boolean;
  press?: boolean;
  layoutId?: string;
}

const sizeConfig = {
  sm: { outer: 24, padding: 8, inner: 16 },
  md: { outer: 32, padding: 12, inner: 20 },
  lg: { outer: 40, padding: 16, inner: 24 },
  xl: { outer: 48, padding: 20, inner: 28 },
  full: { outer: 24, padding: 16, inner: 8 }, // Controlled by parent
};

export default function LiquidCard({
  variant = "standard",
  size = "lg",
  children,
  hover = true,
  press = true,
  layoutId,
  className,
  onClick,
  ...props
}: LiquidCardProps) {
  const { outer, padding, inner } = sizeConfig[size];
  const spring = variant === "pro" ? SPRING_PRO : SPRING_STANDARD;

  // Glass background based on variant
  const glassStyles = {
    standard: {
      background: `
        linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%),
        rgba(0, 70, 190, 0.05)
      `,
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
    },
    pro: {
      background: `
        linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.2) 100%),
        rgba(0, 70, 190, 0.08)
      `,
      boxShadow: `
        0 0 0 1px rgba(0, 70, 190, 0.1),
        0 20px 40px -10px rgba(0, 70, 190, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3)
      `,
    },
    minimal: {
      background: "rgba(255, 255, 255, 0.1)",
      boxShadow: "none",
    },
  };

  const styles = glassStyles[variant];

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -4,
              transition: spring,
            }
          : undefined
      }
      whileTap={
        press
          ? {
              scale: 0.98,
              transition: { duration: 0.1 },
            }
          : undefined
      }
      className={cn(
        "relative overflow-hidden cursor-pointer",
        className
      )}
      style={{
        borderRadius: outer,
        padding,
        backdropFilter: variant === "minimal" ? "none" : "blur(30px) saturate(180%)",
        WebkitBackdropFilter: variant === "minimal" ? "none" : "blur(30px) saturate(180%)",
        background: styles.background,
        boxShadow: styles.boxShadow,
        border: variant === "minimal" ? "1px solid rgba(255,255,255,0.1)" : "1.5px solid transparent",
      }}
      {...props}
    >
      {/* Specular Stroke - only for non-minimal */}
      {variant !== "minimal" && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: outer,
            padding: "1.5px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            zIndex: 1,
          }}
        />
      )}

      {/* Specular Sweep - only for standard and pro */}
      {(variant === "standard" || variant === "pro") && (
        <span
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius: outer, zIndex: 0 }}
        >
          <motion.span
            className="absolute inset-0"
            style={{
              background: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </span>
      )}

      {/* Inner Content */}
      <div
        className="relative z-10 h-full"
        style={{ borderRadius: inner }}
      >
        {children}
      </div>
    </motion.div>
  );
}