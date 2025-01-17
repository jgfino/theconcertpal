import { Database, TablesInsert } from "@theconcertpal/supabase";
import { profileSchema } from "../zod";
import { SupabaseClient } from "@supabase/supabase-js";
import { getProfile } from "../queries";

/**
 * Create or edit a user's profile
 */
export async function createOrEditProfile(
  supabase: SupabaseClient<Database>,
  formData: any
) {
  const validatedData = profileSchema.safeParse(formData);

  if (validatedData.success === false) {
    return {
      error: {
        message: "Invalid data",
      },
    };
  }

  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    return {
      error: {
        message: "User not found",
      },
    };
  }

  const { data: existingProfile, error: existingProfileError } =
    await getProfile(supabase);

  if (existingProfileError) {
    return {
      error: existingProfileError,
    };
  }

  const newProfileData: TablesInsert<"profiles"> = {
    first_name: validatedData.data.firstName.trim(),
    last_name: validatedData.data.lastName.trim(),
    username: validatedData.data.username.trim(),
    pronouns: validatedData.data.pronouns?.trim(),
    bio: validatedData.data.bio?.trim(),
    user_id: userData.user.id,
  };

  if (existingProfile) {
    const { error } = await supabase
      .from("profiles")
      .update(newProfileData)
      .eq("user_id", userData.user.id);

    if (error) {
      return {
        error: error,
      };
    }

    return {
      error: null,
    };
  }

  const { error } = await supabase.from("profiles").insert(newProfileData);

  if (error) {
    return {
      error: error,
    };
  }

  return {
    error: null,
  };
}
