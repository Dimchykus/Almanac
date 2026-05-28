"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { addDays, format, parseISO, subDays } from "date-fns";

interface DateContextValue {
  date: string;
  isToday: boolean;
  prevDay: () => void;
  nextDay: () => void;
}

const DateContext = createContext<DateContextValue>({
  date: "",
  isToday: true,
  prevDay: () => {},
  nextDay: () => {},
});

export function DateProvider({ children }: { children: React.ReactNode }) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [date, setDate] = useState(today);

  const prevDay = () => setDate((d) => format(subDays(parseISO(d), 1), "yyyy-MM-dd"));
  const nextDay = () =>
    setDate((d) => (d < today ? format(addDays(parseISO(d), 1), "yyyy-MM-dd") : d));

  return (
    <DateContext value={{ date, isToday: date === today, prevDay, nextDay }}>
      {children}
    </DateContext>
  );
}

export function useDate() {
  return useContext(DateContext).date;
}

export function useDateNav() {
  const { prevDay, nextDay, isToday } = useContext(DateContext);
  return { prevDay, nextDay, isToday };
}
