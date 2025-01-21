import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";
import { FieldErrors, FieldValues } from "react-hook-form";
import { Spinner } from "./Spinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  errors?: FieldErrors<FieldValues>;
  loading?: boolean;
  color?: string;
  label: string;
  href?: string;
  newTab?: boolean;
}

export default function InputButton({
  id,
  errors,
  label,
  color,
  href,
  newTab,
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const getContent = () => {
    if (href) {
      return (
        <Link href={href} target={newTab ? "_blank" : undefined}>
          {label}
        </Link>
      );
    }

    return label;
  };

  return (
    <div className="flex flex-col gap-4">
      {errors && id && (
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) =>
            message ? <div className="text-error">{message}</div> : null
          }
        />
      )}
      <button
        {...props}
        id={id}
        disabled={loading || disabled}
        className={`bg-${color || "primary"} text-fg py-2 px-4 flex flex-row items-center justify-center gap-2 rounded-xl hover:brightness-110 ${loading ? "opacity-60" : ""} ${className || ""}`}
      >
        {getContent()}
        {loading && <Spinner />}
      </button>
    </div>
  );
}
