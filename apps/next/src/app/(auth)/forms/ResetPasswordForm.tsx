"use client";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "@theconcertpal/common/zod";
import useServerActionForm from "@/hooks/useServerActionForm";

interface ResetPasswordFormProps {
  className?: string;
  tokenHash: string;
  onSubmitAction: (data: any) => Promise<{ error: string | null }>;
}

export default function ResetPasswordForm({
  className,
  tokenHash,
  onSubmitAction,
}: ResetPasswordFormProps) {
  const {
    register,
    formState: { errors },
    loading,
    onSubmit,
  } = useServerActionForm({
    onSubmitAction,
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      tokenHash: tokenHash,
    } as any,
  });

  return (
    <div className={`flex flex-col gap-8 ${className || ""}`}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <Input
          {...register("tokenHash")}
          id="tokenhash"
          type="hidden"
          className="hidden"
          errors={errors}
        />
        <Input
          {...register("password")}
          label="New Password"
          id="password"
          type="password"
          errors={errors}
        />
        <Input
          {...register("confirmPassword")}
          label="Confirm New Password"
          id="confirmPassword"
          type="password"
          errors={errors}
        />
        <Button
          {...register("submit")}
          id="submit"
          type="submit"
          loading={loading}
          label="Reset Password"
          errors={errors}
        />
      </form>
    </div>
  );
}
