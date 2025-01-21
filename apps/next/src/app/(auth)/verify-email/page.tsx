import AuthPageTemplate from "../AuthPageTemplate";

export default async function VerifyEmailPage() {
  return (
    <AuthPageTemplate
      title="Thanks for joining us!"
      subtitle="Please check your email to finish signing up :)"
    />
  );
}
