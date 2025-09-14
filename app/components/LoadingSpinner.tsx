import type { ReactNode } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
  children?: ReactNode;
}

export default function LoadingSpinner({
  size = "md",
  text = "Loading",
  className = "",
  children,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {/* Animated spinner */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin`}
        />
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-pink-500 rounded-full animate-spin`}
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>

      {/* Loading text */}
      {text && (
        <div className={`text-gray-300 ${textSizeClasses[size]} font-medium`}>
          {text}
          <span className="loading-dots ml-1" />
        </div>
      )}

      {/* Optional children content */}
      {children && (
        <div className="text-center text-gray-400 text-sm max-w-md">
          {children}
        </div>
      )}

      {/* Pulsing dots animation */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function LoadingPage({ text = "Loading page" }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <LoadingSpinner size="xl" text={text}>
        <p>Please wait while we prepare your content...</p>
      </LoadingSpinner>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-3 bg-gray-700 rounded" />
        <div className="h-3 bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  );
}
