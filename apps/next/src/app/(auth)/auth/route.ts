import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes";

/**
 * Handle email confirmations for signups
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const redirectTo = request.nextUrl.clone();

  if (token_hash && type) {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error && data.user) {
      redirectTo.pathname = PROTECTED_ROUTES.CREATE_PROFILE;
      redirectTo.searchParams.delete("token_hash");
      redirectTo.searchParams.delete("type");
      redirectTo.searchParams.set("email", data.user.email!);
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to the sign-in page if the token is invalid
  redirectTo.pathname = AUTH_ROUTES.SIGN_IN;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  return NextResponse.redirect(redirectTo);
}
