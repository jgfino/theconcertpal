function route(path: string) {
  return () => path;
}

function routeWithSearchParams<T extends Record<string, string>>(path: string) {
  return (searchParams?: T) => {
    const params = new URLSearchParams();
    Object.entries(searchParams || {}).forEach(([key, value]) =>
      params.append(key, value)
    );

    if (!params.toString()) {
      return path;
    }

    return `${path}?${params.toString()}`;
  };
}

export const AUTH_ROUTES = {
  CREATE_ACCOUNT: "/create-account",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  SIGN_IN: "/sign-in",
  VERIFY_EMAIL: "/verify-email",

  // route-only
  AUTH: "/auth",
} as const;

export const PROTECTED_ROUTES = {
  CREATE_PROFILE: "/create-profile",
  EXPLORE: "/explore",
  JOURNAL: "/journal",
  MY_SHOWS: "/my-shows",
} as const;

export const PUBLIC_ROUTES = {
  REVIEWS_AND_PHOTOS: "/reviews-and-photos",
  NEWS: "/music-news",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY_POLICY: "/privacy-policy",
};

export function isProtectedRoute(pathname: string) {
  return Object.values(PROTECTED_ROUTES).some((route) =>
    pathname.startsWith(route)
  );
}

export function isPublicRoute(pathname: string) {
  return (
    pathname === "/" ||
    Object.values(PUBLIC_ROUTES).some((route) => pathname.startsWith(route)) ||
    Object.values(AUTH_ROUTES).some((route) => pathname.startsWith(route))
  );
}

export const routes = {
  root: route("/"),

  // Auth routes
  auth: {
    createAccount: route(AUTH_ROUTES.CREATE_ACCOUNT),
    createProfile: routeWithSearchParams<{
      email?: string;
      token_hash?: string;
    }>(PROTECTED_ROUTES.CREATE_PROFILE),
    forgotPassword: routeWithSearchParams<{ email?: string }>(
      AUTH_ROUTES.FORGOT_PASSWORD
    ),
    resetPassword: routeWithSearchParams<{
      token_hash?: string;
      success?: string;
    }>(AUTH_ROUTES.RESET_PASSWORD),
    signIn: route(AUTH_ROUTES.SIGN_IN),
    verifyEmail: route(AUTH_ROUTES.VERIFY_EMAIL),
  },

  // Protected routes (tracker)
  explore: route(PROTECTED_ROUTES.EXPLORE),
  journal: route(PROTECTED_ROUTES.JOURNAL),
  myShows: route(PROTECTED_ROUTES.MY_SHOWS),

  // Public routes (blog)
  reviewsPhotos: route(PUBLIC_ROUTES.REVIEWS_AND_PHOTOS),
  news: route(PUBLIC_ROUTES.NEWS),
  about: route(PUBLIC_ROUTES.ABOUT),

  // Other
  privacyPolicy: route(PUBLIC_ROUTES.PRIVACY_POLICY),
};
