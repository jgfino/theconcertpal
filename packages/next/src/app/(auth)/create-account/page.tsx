import LoginSignupForm from "@/app/(auth)/forms/LoginSignupForm";
import { signup } from "../actions";

export default async function CreateAccountPage() {
  return (
    <div className="flex flex-1 justify-center">
      <div className="max-w-form flex flex-col flex-1 min-h-full justify-center">
        <div className="flex flex-col gap-8 pb-16">
          <h1 className="text-3xl text-fg">Hi, New Pal!</h1>
          <p className="text-fg-alt">
            Join now to track your upcoming shows, view your concert journal and
            stats, and see news and photos about your favorite artists.
          </p>
          <LoginSignupForm onSubmitAction={signup} type="signup" />
        </div>
      </div>
    </div>
  );
}
