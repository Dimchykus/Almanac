import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { BriefingPage } from "@/src/components/BriefingPage";
import { apodQueryKey, fetchApodServer } from "@/src/lib/apod";

export default async function Home() {
  const date = new Date().toISOString().slice(0, 10);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: apodQueryKey(date),
    queryFn: () => fetchApodServer(date),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BriefingPage />
    </HydrationBoundary>
  );
}
