import { requestPasswordReset } from "../actions";
import AuthPageTemplate from "../AuthPageTemplate";
import RequestPasswordResetForm from "../forms/RequestPasswordResetForm";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <AuthPageTemplate
      title="Reset Password"
      subtitle="Please enter your email below to reset your password."
    >
      <RequestPasswordResetForm
        email={email}
        onSubmitAction={requestPasswordReset}
      />
    </AuthPageTemplate>
  );
}
