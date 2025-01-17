import EditProfileForm from "../forms/EditProfileForm";
import { createOrEditProfile, logout } from "../actions";

export default async function CreateProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex flex-1 justify-center">
      <div className="max-w-form-large flex flex-col flex-1 min-h-full justify-center">
        <div className="flex flex-col gap-8 pb-16">
          <h1 className="text-3xl text-fg">Just a few more things...</h1>
          <EditProfileForm
            email={email}
            onSubmitAction={createOrEditProfile}
            onLogoutAction={logout}
          />
        </div>
      </div>
    </div>
  );
}
