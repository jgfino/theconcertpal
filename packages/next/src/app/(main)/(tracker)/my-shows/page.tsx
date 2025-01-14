import { redirectIfNotAuthenticated } from "@/utils/auth";

export default async function MyShowsPage() {
  await redirectIfNotAuthenticated("/my-shows");

  return <div>My Shows</div>;
}
