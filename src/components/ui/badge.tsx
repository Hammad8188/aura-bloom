import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "secondary" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "text-foreground",
};

function Badge({ className, variant = "outline", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
