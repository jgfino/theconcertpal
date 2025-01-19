import Button from "@/components/Button";
import { resetPassword } from "../actions";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import AuthPageTemplate from "../AuthPageTemplate";
import { routes } from "@/routes";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    token_hash?: string;
    success?: string;
  }>;
}) {
  const { token_hash, success } = await searchParams;

  return (
    <AuthPageTemplate title="Reset Password">
      {success ? (
        <div className="flex flex-col gap-8">
          <p className="text-fg-alt">
            You have successfully reset your password.
          </p>
          <Button label="Go to My Shows" href={routes.myShows()} />
        </div>
      ) : token_hash ? (
        <ResetPasswordForm
          tokenHash={token_hash}
          onSubmitAction={resetPassword}
        />
      ) : (
        <div className="flex flex-col gap-8">
          <p className="text-fg-alt">
            If you have an account with us, we&apos;ve sent you an email with a
            link to reset your password.
          </p>
          <Button label="Go Back" href={routes.root()} />
        </div>
      )}
    </AuthPageTemplate>
  );
}
