'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { DateProvider } from '@/src/contexts/date-context'
import { BookmarksProvider } from '@/src/components/bookmarks-context'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <DateProvider>
        <BookmarksProvider>{children}</BookmarksProvider>
      </DateProvider>
    </QueryClientProvider>
  )
}
