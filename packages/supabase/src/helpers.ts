import { PostgrestError, AuthError } from "@supabase/supabase-js";

// Helpers
export const isPostgresError = (error: any): error is PostgrestError => {
  return error.status && error.code && error.__isAuthError !== true;
};
