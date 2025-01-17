"use server";

import { createServerClient } from "@/utils/supabase/server";
import {
  login as _login,
  signup as _signup,
  createOrEditProfile as _createOrEditProfile,
} from "@theconcertpal/common/actions";
import { redirect } from "next/navigation";

export async function login(formData: any) {
  const supabase = await createServerClient();

  const { error } = await _login(supabase, formData);

  if (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }

  redirect("/my-shows");
}

export async function signup(formData: any) {
  const supabase = await createServerClient();
  const { data, error } = await _signup(supabase, formData);

  if (error || !data) {
    console.error(error);
    return {
      error: error.message,
    };
  }

  redirect(`/create-profile?email=${data.email!}`);
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

  redirect("/");
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

  redirect("/my-shows");
}
