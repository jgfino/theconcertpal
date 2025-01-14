import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errors?: FieldErrors<FieldValues>;
}

export default function TextInput({
  id,
  label,
  className,
  errors,
  ...props
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        {...props}
        id={id}
        className={`bg-gray-1 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${className || ""}`}
      />
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
