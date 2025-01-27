import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";
import { FieldErrors, FieldValues } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  multiline?: boolean;
  label?: string;
  errors?: FieldErrors<FieldValues>;
  inputClassName?: string;
  rightHref?: string;
  rightText?: string;
}

export default function TextInput({
  id,
  multiline,
  label,
  className,
  inputClassName,
  errors,
  rightHref,
  rightText,
  ...props
}: TextInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      <div className="flex justify-between">
        {label && <label htmlFor={id}>{label}</label>}
        {rightHref && (
          <Link className="text-primary underline" href={rightHref}>
            {rightText}
          </Link>
        )}
      </div>
      {multiline ? (
        // @ts-expect-error types not implemented
        <textarea
          {...props}
          id={id}
          className={`bg-gray-1 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${props.disabled ? "text-fg-alt" : "text-fg"} caret-fg ${inputClassName || ""}`}
        />
      ) : (
        <input
          {...props}
          id={id}
          className={`bg-gray-1 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${props.disabled ? "text-fg-alt" : "text-fg"} caret-fg ${inputClassName || ""}`}
        />
      )}
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) =>
          message ? <div className="text-error">{message}</div> : null
        }
      />
    </div>
  );
}
