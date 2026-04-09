import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles = "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30",
      outline: "border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
      ghost: "text-white hover:bg-white/10",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      secondary: "bg-gray-700 text-white hover:bg-gray-800",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs h-9",
      md: "px-4 py-2 text-sm h-10",
      lg: "px-6 py-3 text-base h-11",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
