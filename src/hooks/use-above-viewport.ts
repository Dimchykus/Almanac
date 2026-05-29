"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to an element and a boolean that is `true`
 * when that element has scrolled fully above the viewport.
 *
 * @param topOffset - pixels to subtract from the top (e.g. sticky header height)
 */
export function useAboveViewport<T extends HTMLElement>(topOffset = 0) {
  const ref = useRef<T>(null);
  const [isAbove, setIsAbove] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsAbove(!entry.isIntersecting),
      { threshold: 0, rootMargin: `-${topOffset}px 0px 0px 0px` }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [topOffset]);

  return { ref, isAbove };
}
