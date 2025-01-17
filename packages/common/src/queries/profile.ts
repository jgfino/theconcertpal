import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@theconcertpal/supabase";

/**
 * Get the profile of the current user
 */
export async function getProfile(supabase: SupabaseClient<Database>) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return {
      error: {
        message: "User not found",
      },
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (error) {
    return {
      error,
    };
  }

  return {
    data,
    error: null,
  };
}
