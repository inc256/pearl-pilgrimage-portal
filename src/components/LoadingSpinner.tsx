import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <Loader2
        className={cn(
          "animate-spin rounded-full border-2 border-primary/20 border-t-primary text-primary",
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-muted-foreground text-sm">{text}</p>}
    </div>
  );
}

interface LoadingScreenProps {
  text?: string;
}

export function LoadingScreen({ text = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card/90 p-8 shadow-xl shadow-primary/10 backdrop-blur">
        <LoadingSpinner size="xl" text={text} />
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-card rounded-lg border border-border p-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-1/4 mb-3" />
      <div className="h-3 bg-muted rounded w-3/4 mb-2" />
      <div className="h-3 bg-muted rounded w-1/2" />
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );
}