import { cn } from "@/lib/utils";
import React from "react";

export function GlassCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Subtle top glare effect */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}
