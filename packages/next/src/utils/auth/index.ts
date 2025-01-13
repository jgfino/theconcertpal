import { redirect } from "next/navigation";
import { createServerClient } from "../supabase/server";

export const redirectIfNotAuthenticated = async (nextUrl: string) => {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect(`/sign-in?nextUrl=${nextUrl}`);
  }
};
