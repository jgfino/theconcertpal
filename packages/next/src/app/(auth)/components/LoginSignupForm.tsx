"use client";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { login, signup } from "../actions";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "../schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginSignupFormProps {
  className?: string;
  type: "login" | "signup";
  nextUrl?: string;
}

export default function LoginSignupForm({
  className,
  type,
  nextUrl,
}: LoginSignupFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let error = true;
    try {
      if (type === "login") {
        await login(data.email, data.password);
      } else {
        await signup(data.email, data.password, data.confirmPassword);
      }
      error = false;
    } catch (error: any) {
      console.error(error);
      setError("submit", { message: error.message ?? "An error occurred" });
      error = true;
    }

    if (!error) {
      router.push(nextUrl || "/my-shows");
    }
  };

  return (
    <div className={`flex flex-col gap-8 ${className || ""}`}>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
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
          loading={isSubmitting}
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
              ? `/create-account${nextUrl ? `?nextUrl=${nextUrl}` : ""}`
              : `/sign-in${nextUrl ? `?nextUrl=${nextUrl}` : ""}`
          }
        >
          {type === "login" ? "Join Now!" : "Sign In Here"}
        </Link>
      </div>
    </div>
  );
}
