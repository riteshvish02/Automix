import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-blue-600/20 text-blue-300 border border-blue-500/50",
    secondary: "border-transparent bg-gray-600/20 text-gray-300 border border-gray-500/50",
    destructive: "border-transparent bg-red-600/20 text-red-300 border border-red-500/50",
    outline: "border border-white/20 text-white/70",
    success: "border-transparent bg-green-600/20 text-green-300 border border-green-500/50",
    warning: "border-transparent bg-yellow-600/20 text-yellow-300 border border-yellow-500/50",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
