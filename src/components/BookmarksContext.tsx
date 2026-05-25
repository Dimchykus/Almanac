"use client";

import { createContext, useContext, useState } from "react";
import type { AlmanacBookmark } from "./types";

interface BookmarksContextValue {
  bookmarks: AlmanacBookmark[];
  addBookmark: (bookmark: AlmanacBookmark) => void;
  removeBookmark: (title: string) => void;
  isBookmarked: (title: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextValue>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
});

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<AlmanacBookmark[]>([]);

  function addBookmark(bookmark: AlmanacBookmark) {
    setBookmarks((prev) =>
      prev.some((b) => b.title === bookmark.title) ? prev : [bookmark, ...prev]
    );
  }

  function removeBookmark(title: string) {
    setBookmarks((prev) => prev.filter((b) => b.title !== title));
  }

  function isBookmarked(title: string) {
    return bookmarks.some((b) => b.title === title);
  }

  return (
    <BookmarksContext value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
