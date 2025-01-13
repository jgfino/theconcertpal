import { redirectIfNotAuthenticated } from "@/utils/auth";

export default async function JournalPage() {
  await redirectIfNotAuthenticated("/journal");

  return <div>Journal</div>;
}
