'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface LiquidButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
}

export function LiquidButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  onClick
}: LiquidButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-full"
  
  const variants = {
    primary: "bg-white text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200",
    secondary: "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50",
    ghost: "bg-transparent text-white/80 hover:text-white hover:bg-white/5"
  }
  
  const sizes = {
    sm: "px-5 py-2.5 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2.5",
    lg: "px-8 py-4 text-lg gap-3"
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span className="whitespace-nowrap font-semibold tracking-tight">
        {children}
      </span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </motion.button>
  )
}