import LoginSignupForm from "@/app/(auth)/components/LoginSignupForm";
import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ nextUrl?: string }>;
}) {
  const { nextUrl } = await searchParams;

  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect(nextUrl || "/my-shows");
  }

  return (
    <div className="flex flex-1 justify-center">
      <div className="max-w-form flex flex-col flex-1 min-h-full justify-center">
        <div className="flex flex-col gap-8 pb-16">
          <h1 className="text-3xl text-fg">Welcome Back.</h1>
          <p className="text-fg-alt">
            Log in to your account to track your upcoming shows, view your
            concert journal, and see news and photos about your favorite
            artists.
          </p>
          <LoginSignupForm type="login" nextUrl={nextUrl} />
        </div>
      </div>
    </div>
  );
}
