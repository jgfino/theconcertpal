import MainLayout from "@/app/(main)/layout";
import ExplorePage from "@/app/(main)/(tracker)/explore/page";

export default async function RootPage() {
  return (
    <MainLayout>
      <ExplorePage />
    </MainLayout>
  );
}
