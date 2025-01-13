import { createServerClient } from "@/utils/supabase/server";
import MainLayout from "@/app/(main)/layout";
import ExplorePage from "@/app/(main)/(tracker)/explore/page";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const supabase = await createServerClient();

  // If the user is logged in, redirect to their dashboard
  // Otherwise, redirect to the latest news/explore home page

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return (
      <MainLayout>
        <ExplorePage />
      </MainLayout>
    );
  }

  redirect("/my-shows");
}
