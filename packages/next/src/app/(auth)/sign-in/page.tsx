import LoginSignupForm from "@/app/(auth)/forms/LoginSignupForm";
import { login } from "../actions";
import AuthPageTemplate from "../AuthPageTemplate";

export default async function SignInPage() {
  return (
    <AuthPageTemplate
      title="Hi."
      subtitle="Log in to your account to track your upcoming shows, view your
            concert journal and stats, and see news and photos about your
            favorite artists."
    >
      <LoginSignupForm onSubmitAction={login} type="login" />
    </AuthPageTemplate>
  );
}
