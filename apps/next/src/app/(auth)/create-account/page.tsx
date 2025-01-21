import LoginSignupForm from "@/app/(auth)/forms/LoginSignupForm";
import { signup } from "../actions";
import AuthPageTemplate from "../AuthPageTemplate";

export default async function CreateAccountPage() {
  return (
    <AuthPageTemplate
      title="Create Account"
      subtitle="Join now to track your upcoming shows, view your concert journal and
            stats, and see news and photos about your favorite artists."
    >
      <LoginSignupForm onSubmitAction={signup} type="signup" />
    </AuthPageTemplate>
  );
}
