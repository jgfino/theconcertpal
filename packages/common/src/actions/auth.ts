import { SupabaseClient } from "@supabase/supabase-js";
import { loginSchema, signupSchema } from "../zod";
import { Database } from "@theconcertpal/supabase";

/**
 * Login with email and password
 */
export async function login(supabase: SupabaseClient<Database>, formData: any) {
  const validatedData = loginSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      error: {
        message: "Invalid data",
      },
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedData.data);

  if (error) {
    return {
      error: error,
    };
  }

  return {
    error: null,
  };
}

/**
 * Signup with email and password
 */
export async function signup(
  supabase: SupabaseClient<Database>,
  formData: any
) {
  const validatedData = signupSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      error: {
        message: "Invalid data",
      },
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: validatedData.data.email.trim(),
    password: validatedData.data.password.trim(),
  });

  if (error) {
    return {
      error: error,
    };
  }

  if (!data?.user) {
    return {
      error: {
        message: "Error creating user",
      },
    };
  }

  return {
    data: data.user,
    error: null,
  };
}

/**
 * Logout the current user
 */
export async function logout(supabase: SupabaseClient<Database>) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: error,
    };
  }

  return {
    error: null,
  };
}
