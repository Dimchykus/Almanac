'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
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
    </QueryClientProvider>
  )
}
