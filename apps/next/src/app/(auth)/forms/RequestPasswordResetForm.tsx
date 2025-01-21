"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";

import { requestPasswordResetSchema } from "@theconcertpal/common/zod";
import useServerActionForm from "@/hooks/useServerActionForm";

interface RequestPasswordResetFormProps {
  className?: string;
  email?: string;
  onSubmitAction: (data: any) => Promise<{ error: string | null }>;
}

export default function RequestPasswordResetForm({
  className,
  email,
  onSubmitAction,
}: RequestPasswordResetFormProps) {
  const {
    register,
    formState: { errors },
    loading,
    onSubmit,
  } = useServerActionForm({
    onSubmitAction,
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: {
      email,
    } as any,
  });

  return (
    <div className={`flex flex-col gap-8 ${className || ""}`}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <Input
          {...register("email")}
          label="Email"
          id="email"
          type="email"
          errors={errors}
        />
        <Button
          {...register("submit")}
          id="submit"
          type="submit"
          loading={loading}
          label="Submit"
          errors={errors}
        />
      </form>
    </div>
  );
}
