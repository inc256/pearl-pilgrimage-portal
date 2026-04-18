import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  title = "Something went wrong",
  message = "Failed to load data. Please try again.",
  onRetry
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-destructive/10 p-4 rounded-full mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

interface ErrorMessageProps {
  error: Error | string | null;
  fallbackMessage?: string;
}

export function ErrorMessage({ error, fallbackMessage = "An error occurred" }: ErrorMessageProps) {
  const message = typeof error === 'string' 
    ? error 
    : error?.message || fallbackMessage;
  
  return (
    <div className="flex items-center gap-2 text-destructive text-sm">
      <AlertTriangle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}