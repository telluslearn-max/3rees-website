"use client";

interface ConditionBadgeProps {
  condition: "Like New" | "Excellent" | "Good" | "Fair";
  size?: "sm" | "md";
  showDot?: boolean;
}

const conditionConfig = {
  "Like New": { 
    bg: "bg-green-50", 
    text: "text-green-700", 
    dot: "bg-green-500",
    border: "border-green-200"
  },
  "Excellent": { 
    bg: "bg-blue-50", 
    text: "text-blue-700", 
    dot: "bg-apple-blue",
    border: "border-blue-200"
  },
  "Good": { 
    bg: "bg-amber-50", 
    text: "text-amber-700", 
    dot: "bg-amber-500",
    border: "border-amber-200"
  },
  "Fair": { 
    bg: "bg-orange-50", 
    text: "text-orange-700", 
    dot: "bg-orange-500",
    border: "border-orange-200"
  }
};

export default function ConditionBadge({ 
  condition, 
  size = "sm",
  showDot = true 
}: ConditionBadgeProps) {
  const config = conditionConfig[condition];
  const sizeClasses = size === "sm" 
    ? "px-2.5 py-1 text-xs" 
    : "px-3 py-1.5 text-sm";

  return (
    <span 
      role="status"
      aria-label={`Condition: ${condition}`}
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium 
        border ${config.border} ${config.bg} ${config.text} ${sizeClasses}
      `}
    >
      {showDot && (
        <span 
          className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
          aria-hidden="true"
        />
      )}
      {condition}
    </span>
  );
}