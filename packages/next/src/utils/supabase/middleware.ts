import { createServerClient } from "@supabase/ssr";
import { getProfile } from "@theconcertpal/common/queries";
import { Database } from "@theconcertpal/supabase";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/sign-in",
  "/create-account",
  "/explore",
  "/reviews-and-photos",
  "/music-news",
  "/about",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

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

  const isPublic =
    PUBLIC_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route)) ||
    request.nextUrl.pathname === "/";

  if (!user && !isPublic) {
    // no user, redirect to sign-in
    const url = request.nextUrl.clone();
    url.searchParams.delete("email");
    url.pathname = `/sign-in`;
    return NextResponse.redirect(url);
  }

  if (user) {
    // If there is a user, check if there is a profile
    const { data } = await getProfile(supabase);

    if (!data && !request.nextUrl.pathname.startsWith("/create-profile")) {
      // no profile, redirect to create-profile but still keep session details
      const url = request.nextUrl.clone();
      url.pathname = "/create-profile";
      url.searchParams.set("email", user.email!);
      return NextResponse.redirect(url);
    }

    // Can't go to sign-in or create-account if already logged in
    if (
      request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname.startsWith("/create-account")
    ) {
      const url = request.nextUrl.clone();
      url.searchParams.delete("email");
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // Can't go to create-profile if already has a profile
    if (data && request.nextUrl.pathname.startsWith("/create-profile")) {
      const url = request.nextUrl.clone();
      url.searchParams.delete("email");
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
