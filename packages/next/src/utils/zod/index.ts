import { ZodError } from "zod";

export const flattenErrors = (errors: ZodError<Record<string, string>>) => {
  const flattened = errors.flatten().fieldErrors;
  return Object.entries(flattened).reduce(
    (acc, [key, value]) => {
      acc[key] = value?.join(", ") || "";
      return acc;
    },
    {} as Record<string, string>
  );
};
