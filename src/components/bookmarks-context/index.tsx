"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { AlmanacBookmark } from "../types";

const STORAGE_KEY = "almanac-bookmarks";

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

function readStorage(): AlmanacBookmark[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as AlmanacBookmark[];
  } catch {
    // corrupted storage — start fresh
  }
  return [];
}

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<AlmanacBookmark[]>(readStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // storage quota exceeded or private-browsing restriction — ignore
    }
  }, [bookmarks]);

  function addBookmark(bookmark: AlmanacBookmark) {
    setBookmarks((prev) =>
      prev.some((b) => b.title === bookmark.title) ? prev : [bookmark, ...prev],
    );
  }

  function removeBookmark(title: string) {
    setBookmarks((prev) => prev.filter((b) => b.title !== title));
  }

  function isBookmarked(title: string) {
    return bookmarks.some((b) => b.title === title);
  }

  return (
    <BookmarksContext
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarksContext>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
