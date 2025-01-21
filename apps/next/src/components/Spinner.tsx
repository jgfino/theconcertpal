interface SpinnerProps {
  className?: string;
  color?: string;
}

export function Spinner({ className, color }: SpinnerProps) {
  return (
    <div
      className={`spinner h-2/3 border-${color ?? "fg"} border-r-transparent border-2 ${className}`}
    />
  );
}
