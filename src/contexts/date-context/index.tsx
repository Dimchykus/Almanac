"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addDays, format, parseISO, subDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { isISODate } from "@/src/lib/utils";

const DEBOUNCE_MS = 300;

interface DateContextValue {
  date: string;
  debouncedDate: string;
  isToday: boolean;
  prevDay: () => void;
  nextDay: () => void;
  goToDate: (iso: string) => void;
}

const DateContext = createContext<DateContextValue>({
  date: "",
  debouncedDate: "",
  isToday: true,
  prevDay: () => {},
  nextDay: () => {},
  goToDate: () => {},
});

export function DateProvider({ children }: { children: React.ReactNode }) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const searchParams = useSearchParams();

  const initialDate = useMemo(() => {
    const raw = searchParams.get("date");
    return raw && isISODate(raw) && raw <= today
      ? raw
      : today;
  }, [searchParams, today]);

  const [date, setDate] = useState(initialDate);
  const [debouncedDate, setDebouncedDate] = useState(initialDate);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedDate(date), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [date]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedDate === today) {
      params.delete("date");
    } else {
      params.set("date", debouncedDate);
    }
    const search = params.toString();
    window.history.replaceState(null, "", search ? `?${search}` : window.location.pathname);
  }, [debouncedDate, today]);

  const prevDay = () => setDate((d) => format(subDays(parseISO(d), 1), "yyyy-MM-dd"));
  const nextDay = () =>
    setDate((d) => (d < today ? format(addDays(parseISO(d), 1), "yyyy-MM-dd") : d));
  const goToDate = (iso: string) => {
    if (iso <= today) setDate(iso);
  };

  return (
    <DateContext value={{ date, debouncedDate, isToday: date === today, prevDay, nextDay, goToDate }}>
      {children}
    </DateContext>
  );
}

/** Debounced date — use this as query keys so rapid navigation doesn't fire redundant requests. */
export function useDate() {
  return useContext(DateContext).debouncedDate;
}

/** Immediate date — use this for display only (date header, picker highlight). */
export function useDisplayDate() {
  return useContext(DateContext).date;
}

export function useDateNav() {
  const { prevDay, nextDay, isToday } = useContext(DateContext);
  return { prevDay, nextDay, isToday };
}

export function useGoToDate() {
  return useContext(DateContext).goToDate;
}
