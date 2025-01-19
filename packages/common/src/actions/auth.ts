import { SupabaseClient } from "@supabase/supabase-js";
import {
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
  signupSchema,
} from "../zod";
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

  return await supabase.auth.signInWithPassword(validatedData.data);
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

  return await supabase.auth.signUp({
    email: validatedData.data.email.trim(),
    password: validatedData.data.password.trim(),
  });
}

/**
 * Logout the current user
 */
export async function logout(supabase: SupabaseClient<Database>) {
  return await supabase.auth.signOut();
}

/**
 * Send a password reset email
 */
export async function requestPasswordReset(
  supabase: SupabaseClient<Database>,
  formData: any
) {
  const validatedData = requestPasswordResetSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      error: {
        message: "Invalid data",
      },
    };
  }

  return await supabase.auth.resetPasswordForEmail(
    validatedData.data.email.trim()
  );
}

/**
 * Reset a user's password
 */
export async function resetPassword(
  supabase: SupabaseClient<Database>,
  formData: any
) {
  const validatedData = resetPasswordSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      error: {
        message: "Invalid data",
      },
    };
  }

  const { error: loginError } = await supabase.auth.verifyOtp({
    token_hash: validatedData.data.tokenHash.trim(),
    type: "recovery",
  });

  if (loginError) {
    return {
      error: loginError,
    };
  }

  return await supabase.auth.updateUser({
    password: validatedData.data.password.trim(),
  });
}
