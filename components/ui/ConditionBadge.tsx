"use client";

interface ConditionBadgeProps {
  condition: "Like New" | "Excellent" | "Good" | "Fair";
  size?: "sm" | "md";
}

const conditionConfig = {
  "Like New": { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500", label: "Like New" },
  "Excellent": { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500", label: "Excellent" },
  "Good": { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500", label: "Good" },
  "Fair": { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500", label: "Fair" }
};

export default function ConditionBadge({ condition, size = "sm" }: ConditionBadgeProps) {
  const config = conditionConfig[condition];
  const sizeClasses = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </div>
  );
}