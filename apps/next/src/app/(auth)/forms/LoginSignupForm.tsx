"use client";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  LoginSchema,
  loginSchema,
  SignupSchema,
  signupSchema,
} from "@theconcertpal/common/zod";
import useServerActionForm from "@/hooks/useServerActionForm";
import { routes } from "@/routes";

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
    watch,
    formState: { errors },
    loading,
    onSubmit,
  } = useServerActionForm<LoginSchema | SignupSchema>({
    onSubmitAction,
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
  });

  const email = watch("email");

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
          rightHref={
            type === "login"
              ? `/forgot-password${email ? `?email=${email}` : ""}`
              : undefined
          }
          rightText={type === "login" ? "Forgot Password?" : undefined}
        />
        {type === "signup" && (
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            errors={errors}
          />
        )}
        <Button
          {...register("submit")}
          id="submit"
          type="submit"
          loading={loading}
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
          href={
            type === "login"
              ? routes.auth.createAccount()
              : routes.auth.signIn()
          }
        >
          {type === "login" ? "Join Now!" : "Sign In"}
        </Link>
      </div>
    </div>
  );
}
