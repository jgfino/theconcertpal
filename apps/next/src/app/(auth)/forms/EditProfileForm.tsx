"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { profileSchema } from "@theconcertpal/common/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "@/components/Select";
import { Tables } from "@theconcertpal/supabase";
import useServerActionForm from "@/hooks/useServerActionForm";

interface EditProfileFormProps {
  className?: string;
  prevData?: Tables<"profiles"> & { email: string };
  email: string;
  onSubmitAction: (data: any) => Promise<{ error: string | null }>;
  onLogoutAction: () => Promise<{ error: string | null }>;
}

const pronouns = ["she/her", "he/him", "they/them"];

export default function EditProfileForm({
  className,
  prevData,
  email,
  onSubmitAction,
  onLogoutAction,
}: EditProfileFormProps) {
  const {
    register: registerLogout,
    formState: { errors: logoutErrors },
    loading: isLoggingOut,
    onSubmit: onSubmitLogout,
  } = useServerActionForm({
    onSubmitAction: onLogoutAction,
  });

  const {
    register,
    watch,
    formState: { errors },
    loading,
    onSubmit,
  } = useServerActionForm({
    onSubmitAction: (data) => {
      return onSubmitAction({
        ...data,
        pronouns:
          data.pronouns === "other" ? data.pronounsOther : data.pronouns,
      });
    },
    resolver: zodResolver(profileSchema),
    defaultValues: prevData
      ? ({
          email: prevData.email,
          username: prevData.username,
          firstName: prevData.first_name,
          lastName: prevData.last_name,
          pronouns: prevData.pronouns
            ? pronouns.includes(prevData.pronouns)
              ? prevData.pronouns
              : "other"
            : undefined,
          pronounsOther: prevData.pronouns,
          bio: prevData.bio,
        } as any)
      : undefined,
  });
  const pronounSelection = watch("pronouns");

  return (
    <div className={`flex flex-col gap-8 ${className || ""}`}>
      <form className="flex flex-col gap-8 " onSubmit={onSubmit}>
        <Input
          {...register("email")}
          id="email"
          label="Email"
          errors={errors}
          value={email}
          disabled
        />
        <Input
          {...register("username")}
          id="username"
          label="Username"
          maxLength={15}
          errors={errors}
        />
        <div className="md:flex-row md:gap-2 flex flex-col gap-8 w-full">
          <Input
            {...register("firstName")}
            className="md:flex-1"
            id="firstName"
            label="First Name"
            maxLength={30}
            errors={errors}
          />
          <Input
            {...register("lastName")}
            className="md:flex-1"
            id="lastName"
            label="Last Name"
            maxLength={30}
            errors={errors}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Select
            {...register("pronouns")}
            id="pronouns"
            label="Pronouns (Optional)"
            errors={errors}
          >
            <option value=""></option>
            <option value="she/her">she/her</option>
            <option value="he/him">he/him</option>
            <option value="they/them">they/them</option>
            <option value="other">Other</option>
          </Select>
          <Input
            {...register("pronounsOther")}
            className={pronounSelection !== "other" ? "hidden" : ""}
            id="pronounsOther"
            placeholder="she/they, they/he, etc."
            maxLength={10}
            errors={errors}
          />
        </div>
        <Input
          {...register("bio")}
          multiline
          maxLength={500}
          id="bio"
          label="Bio (Optional)"
          errors={errors}
        />
        <Button
          {...register("submit")}
          id="submit"
          type="submit"
          loading={loading}
          label={"Save"}
          errors={errors}
        />
      </form>
      <form className="flex flex-col" onSubmit={onSubmitLogout}>
        <Button
          {...registerLogout("submit")}
          id="submit"
          type="submit"
          loading={isLoggingOut}
          label={"Sign Out"}
          errors={logoutErrors}
          color="error"
        />
      </form>
    </div>
  );
}
