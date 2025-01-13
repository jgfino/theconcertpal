import { redirectIfNotAuthenticated } from "@/utils/auth";
import { createServerClient } from "@/utils/supabase/server";

export default async function MyShowsPage() {
  await redirectIfNotAuthenticated("/my-shows");

  const supabase = await createServerClient();
  await supabase.auth.signOut();

  return <div>My Shows</div>;
}
