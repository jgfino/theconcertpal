import EditProfileForm from "../forms/EditProfileForm";
import { createOrEditProfile, logout } from "../actions";
import AuthPageTemplate from "../AuthPageTemplate";
import { redirect } from "next/navigation";
import { routes } from "@/routes";

export default async function CreateProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  if (!email) {
    redirect(routes.auth.signIn());
  }

  return (
    <AuthPageTemplate
      wide
      title="Nice! Just a few more things..."
      subtitle="Join now to track your upcoming shows, view your concert journal and
            stats, and see news and photos about your favorite artists."
    >
      <EditProfileForm
        email={email}
        onSubmitAction={createOrEditProfile}
        onLogoutAction={logout}
      />
    </AuthPageTemplate>
  );
}
