'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { DateProvider } from '@/src/components/DateContext'
import { BookmarksProvider } from '@/src/components/BookmarksContext'

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
