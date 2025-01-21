import { AUTH_ROUTES, PROTECTED_ROUTES, isPublicRoute } from "@/routes";
import { createServerClient } from "@supabase/ssr";
import { getProfile } from "@theconcertpal/common/queries";
import { Database } from "@theconcertpal/supabase";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url = request.nextUrl.clone();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicRoute(request.nextUrl.pathname)) {
    // no user, redirect to sign-in
    url.pathname = AUTH_ROUTES.SIGN_IN;
    return NextResponse.redirect(url);
  }

  if (user) {
    // If there is a user, check if there is a profile
    const { data } = await getProfile(supabase);

    // no profile, redirect to create-profile but still keep session details
    if (
      !data &&
      !request.nextUrl.pathname.startsWith(PROTECTED_ROUTES.CREATE_PROFILE)
    ) {
      url.pathname = PROTECTED_ROUTES.CREATE_PROFILE;
      url.searchParams.set("email", user.email!);
      return NextResponse.redirect(url);
    }

    // Can't go to sign-in or create-account if already logged in
    if (
      request.nextUrl.pathname.startsWith(AUTH_ROUTES.SIGN_IN) ||
      request.nextUrl.pathname.startsWith(AUTH_ROUTES.CREATE_ACCOUNT)
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // Can't go to create-profile if already has a profile
    if (
      data &&
      request.nextUrl.pathname.startsWith(PROTECTED_ROUTES.CREATE_PROFILE)
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
