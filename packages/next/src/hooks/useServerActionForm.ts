"use client";

import { useTransition } from "react";
import { DefaultValues, FieldValues, Resolver, useForm } from "react-hook-form";

interface ServerActionFormProps<T extends FieldValues> {
  resolver?: Resolver<T & { submit: string }, any>;
  defaultValues?: DefaultValues<T & { submit: string }>;
  onError?: (error: string) => void;
  onSubmitAction: (data: any) => Promise<{ error: string | null }>;
}

export default function useServerActionForm<T extends FieldValues>({
  resolver,
  defaultValues,
  onError,
  onSubmitAction,
}: ServerActionFormProps<T>) {
  const form = useForm({
    resolver,
    defaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      const { error } = await onSubmitAction(data);

      if (error) {
        if (onError) {
          onError(error);
        } else {
          // @ts-expect-error this will work fine when a type is provided
          form.setError("submit", {
            message: error,
          });
        }
      }
    });
  });

  return {
    ...form,
    onSubmit,
    loading: form.formState.isSubmitting || isPending,
  };
}
