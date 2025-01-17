"use client";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, signupSchema } from "@theconcertpal/common/zod";
import { useTransition } from "react";

interface LoginSignupFormProps {
  className?: string;
  type: "login" | "signup";
  onSubmitAction: (data: any) => Promise<{ error: string | null }>;
}

export default function LoginSignupForm({
  className,
  type,
  onSubmitAction,
}: LoginSignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const { error } = await onSubmitAction(data);

      if (error) {
        setError("submit", {
          message: error,
        });
      }
    });
  });

  return (
    <div className={`flex flex-col gap-8 ${className || ""}`}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <Input
          {...register("email")}
          id="email"
          label="Email"
          type="email"
          errors={errors}
        />
        <Input
          {...register("password")}
          id="password"
          label="Password"
          type="password"
          errors={errors}
        />
        {type === "signup" && (
          <>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              errors={errors}
            />
          </>
        )}
        <Button
          {...register("submit")}
          id="submit"
          type="submit"
          loading={isSubmitting || isPending}
          label={type === "login" ? "Log In" : "Sign Up"}
          errors={errors}
        />
      </form>
      <div className="flex flex-col gap-1 text-center items-center">
        <span className="text-fg-alt">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </span>
        <Link
          className="underline"
          href={type === "login" ? "/create-account" : "/sign-in"}
        >
          {type === "login" ? "Join Now!" : "Sign In"}
        </Link>
      </div>
    </div>
  );
}
