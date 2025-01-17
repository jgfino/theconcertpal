import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues } from "react-hook-form";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  placeHolder?: string;
  label?: string;
  errors?: FieldErrors<FieldValues>;
}

export default function TextInput({
  id,
  label,
  className,
  errors,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={`bg-gray-1 py-2 px-4 rounded-xl ${props.disabled ? "text-fg-alt" : "text-fg"} ${className || ""}`}
      >
        <select
          className="bg-transparent w-full border-none focus:ring-0 focus:outline-none"
          {...props}
          id={id}
        />
      </div>
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
