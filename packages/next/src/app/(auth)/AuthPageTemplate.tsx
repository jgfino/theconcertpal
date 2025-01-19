interface AuthPageTemplateProps {
  title: string;
  wide?: boolean;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function AuthPageTemplate({
  title,
  wide,
  subtitle,
  children,
}: AuthPageTemplateProps) {
  return (
    <div className="flex flex-1 justify-center">
      <div
        className={`${wide ? "max-w-form-large" : "max-w-form"} flex flex-col flex-1 min-h-full justify-center`}
      >
        <div className="flex flex-col gap-8 pb-16">
          <h1 className="text-3xl text-fg">{title}</h1>
          {subtitle && <p className="text-fg-alt">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
