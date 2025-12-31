import type { ReactNode } from "react";

export interface LoadingProps {
  /**
   * Loading variant
   * @default "spinner"
   */
  variant?: "spinner" | "skeleton" | "overlay";
  /**
   * Size of the loading indicator
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Custom message to display
   */
  message?: string;
  /**
   * Whether to show as full screen overlay
   * @default false
   */
  fullScreen?: boolean;
}

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export const Loading = ({
  variant = "spinner",
  size = "md",
  message,
  fullScreen = false,
}: LoadingProps) => {
  const Spinner = () => (
    <svg
      className={`animate-spin text-blue-600 ${sizeStyles[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const Skeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  );

  if (variant === "overlay" || fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          {message && <p className="text-gray-600">{message}</p>}
        </div>
      </div>
    );
  }

  if (variant === "skeleton") {
    return (
      <div className="w-full">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <Spinner />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};
