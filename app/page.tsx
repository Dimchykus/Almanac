import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BriefingPage } from "@/src/views/briefing-container";
import { apodQueryKey, fetchApodServer } from "@/src/lib/apod";
import { onThisDayQueryKey, fetchOnThisDayServer } from "@/src/lib/wikipedia";
import { openAiQueryKey, fetchOpenAiServer } from "@/src/lib/open-ai";

export default async function Home() {
  const date = new Date().toISOString().slice(0, 10);
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: apodQueryKey(date),
      queryFn: () => fetchApodServer(date),
    }),
    queryClient.prefetchQuery({
      queryKey: onThisDayQueryKey(date),
      queryFn: () => fetchOnThisDayServer(date),
    }),
    queryClient.prefetchQuery({
      queryKey: openAiQueryKey(date),
      queryFn: () => fetchOpenAiServer(date),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BriefingPage />
    </HydrationBoundary>
  );
}
