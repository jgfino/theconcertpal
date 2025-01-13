"use server";

import { createServerClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "./schema";

export async function login(email: string, password: string) {
  const supabase = await createServerClient();

  const validatedData = loginSchema.parse({
    email: email,
    password: password,
  });

  const { error } = await supabase.auth.signInWithPassword(validatedData);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function signup(
  email: string,
  password: string,
  confirmPassword: string
) {
  const supabase = await createServerClient();

  const validatedData = signupSchema.parse({
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });

  const { error } = await supabase.auth.signUp(validatedData);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
