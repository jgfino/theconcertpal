"use server";

import { routes } from "@/routes";
import { createServerClient } from "@/utils/supabase/server";
import { isAuthError } from "@supabase/supabase-js";
import {
  createOrEditProfile as _createOrEditProfile,
  login as _login,
  requestPasswordReset as _requestPasswordReset,
  resetPassword as _resetPassword,
  signup as _signup,
} from "@theconcertpal/common/actions";
import { redirect } from "next/navigation";

export async function login(formData: any) {
  const supabase = await createServerClient();

  const { error } = await _login(supabase, formData);

  if (error) {
    console.error(error);

    if (isAuthError(error)) {
      if (error.code === "email_not_confirmed") {
        // Resend email and redirect to the email confirmation page
        const { error: resendError } = await _signup(supabase, {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.password,
        });

        if (resendError) {
          console.error(resendError);
          return {
            error: resendError?.message ?? "An error occurred",
          };
        }

        redirect(routes.auth.verifyEmail());
      }
    }

    return {
      error: error.message,
    };
  }

  redirect(routes.myShows());
}

export async function signup(formData: any) {
  const supabase = await createServerClient();
  const { error } = await _signup(supabase, formData);

  if (error) {
    console.error(error);
    return {
      error: error?.message ?? "An error occurred",
    };
  }

  redirect(routes.auth.verifyEmail());
}

export async function logout() {
  const supabase = await createServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }

  redirect(routes.root());
}

export async function requestPasswordReset(formData: any) {
  const supabase = await createServerClient();
  const { error } = await _requestPasswordReset(supabase, formData);

  if (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }

  redirect(routes.auth.resetPassword());
}

export async function resetPassword(formData: any) {
  const supabase = await createServerClient();
  const { error } = await _resetPassword(supabase, formData);

  if (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }

  redirect(routes.auth.resetPassword({ success: "true" }));
}

export async function createOrEditProfile(formData: any) {
  const supabase = await createServerClient();
  const { error } = await _createOrEditProfile(supabase, formData);

  if (error) {
    console.error(error);
    return {
      error: error.message.includes("duplicate key value")
        ? "Username already taken"
        : error.message,
    };
  }

  // TODO: Redirect to the user's profile page if updating
  redirect(routes.myShows());
}
