interface WidthContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function WidthContainer({ children, className }: WidthContainerProps) {
  return (
    <div className={`w-full px-12 ${className}`}>
      <div className="max-w-[1500px]">{children}</div>
    </div>
  );
}
