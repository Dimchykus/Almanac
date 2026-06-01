'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import { Toaster } from 'sonner'
import { DateProvider } from '@/src/contexts/date-context'
import { BookmarksProvider } from '@/src/components/bookmarks-context'
import { PageLoader } from '@/src/components/page-loader'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<PageLoader />}>
        <DateProvider>
          <BookmarksProvider>{children}</BookmarksProvider>
        </DateProvider>
      </Suspense>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "oklch(0.18 0.016 245)",
            border: "1px solid oklch(0.295 0.020 245)",
            color: "oklch(0.88 0.012 245)",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
          },
        }}
      />
    </QueryClientProvider>
  )
}
