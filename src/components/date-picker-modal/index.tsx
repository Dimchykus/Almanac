"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  getDaysInMonth,
  getDay,
  addMonths,
  subMonths,
  subDays,
  subYears,
  parseISO,
  isValid,
} from "date-fns";
import { IconChevronLeft, IconChevronRight, IconCalendar } from "@tabler/icons-react";
import { useDisplayDate, useGoToDate } from "@/src/contexts/date-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface DatePickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DOWS = ["S", "M", "T", "W", "T", "F", "S"];

export function DatePickerModal({ open, onOpenChange }: DatePickerModalProps) {
  const iso = useDisplayDate();
  const goToDate = useGoToDate();
  const today = new Date().toISOString().slice(0, 10);

  const [viewDate, setViewDate] = useState(() => startOfMonth(parseISO(iso)));
  const [typeMode, setTypeMode] = useState(false);
  const [typeInput, setTypeInput] = useState("");

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const viewMonthIso = format(viewDate, "yyyy-MM");
  const todayMonthIso = today.slice(0, 7);
  const isAtTodayMonth = viewMonthIso >= todayMonthIso;

  const firstDow = getDay(viewDate);
  const daysInMonth = getDaysInMonth(viewDate);

  const prevMonthDays = getDaysInMonth(subMonths(viewDate, 1));
  const leading = Array.from(
    { length: firstDow },
    (_, i) => prevMonthDays - firstDow + 1 + i,
  );

  const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7;
  const trailing = Array.from(
    { length: totalCells - firstDow - daysInMonth },
    (_, i) => i + 1,
  );

  function toISO(day: number) {
    return format(new Date(viewYear, viewMonth, day), "yyyy-MM-dd");
  }

  function handleSelect(day: number) {
    const newIso = toISO(day);
    if (newIso > today) return;
    goToDate(newIso);
    onOpenChange(false);
  }

  function prevMonth() {
    setViewDate((d) => startOfMonth(subMonths(d, 1)));
  }

  function nextMonth() {
    if (isAtTodayMonth) return;
    setViewDate((d) => startOfMonth(addMonths(d, 1)));
  }

  function jumpToTodayMonth() {
    setViewDate(startOfMonth(parseISO(today)));
  }

  function goToday() {
    goToDate(today);
    onOpenChange(false);
  }

  function goYesterday() {
    goToDate(format(subDays(new Date(), 1), "yyyy-MM-dd"));
    onOpenChange(false);
  }

  function goOneYearAgo() {
    goToDate(format(subYears(new Date(), 1), "yyyy-MM-dd"));
    onOpenChange(false);
  }

  function goRandom() {
    const start = new Date(1970, 0, 1).getTime();
    const end = new Date().getTime();
    const rand = new Date(start + Math.random() * (end - start));
    goToDate(format(rand, "yyyy-MM-dd"));
    onOpenChange(false);
  }

  const isTypeInputValid = (() => {
    if (typeInput.length !== 10) return false;
    const parsed = parseISO(typeInput);
    return isValid(parsed) && format(parsed, "yyyy-MM-dd") === typeInput && typeInput <= today;
  })();

  function handleDateInput(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    let masked = digits;
    if (digits.length > 4) masked = digits.slice(0, 4) + "-" + digits.slice(4);
    if (digits.length > 6) masked = masked.slice(0, 7) + "-" + digits.slice(6);
    setTypeInput(masked);
  }

  function handleTypeSubmit() {
    if (!typeInput.trim()) return;
    try {
      const parsed = parseISO(typeInput.trim());
      if (!isNaN(parsed.getTime())) {
        const newIso = format(parsed, "yyyy-MM-dd");
        if (newIso <= today) {
          goToDate(newIso);
          onOpenChange(false);
        }
      }
    } catch {
      // invalid input, do nothing
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-alm-surface border border-[oklch(0.295_0.020_245)] rounded-xl p-7 w-[500px] sm:max-w-[500px] gap-0"
        style={{ boxShadow: "0 30px 80px oklch(0 0 0 / 0.5)" }}
      >
        <DialogTitle className="sr-only">Pick a date</DialogTitle>

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="font-display text-2xl text-alm-ink">
            {format(viewDate, "MMMM")}{" "}
            <em className="italic text-alm-accent">
              {format(viewDate, "yyyy")}
            </em>
          </div>
          <div className="flex gap-1.5">
            <Button variant="outline" size="icon-sm" onClick={prevMonth}>
              <IconChevronLeft size={14} />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={jumpToTodayMonth} title="Go to today">
              <IconCalendar size={14} />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={nextMonth} disabled={isAtTodayMonth}>
              <IconChevronRight size={14} />
            </Button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {DOWS.map((d, i) => (
            <div
              key={`dow-${i}`}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-alm-ink-faint text-center py-1.5 pb-2.5"
            >
              {d}
            </div>
          ))}

          {leading.map((d, i) => (
            <div
              key={`l-${i}`}
              className="h-14 rounded-md flex items-center justify-center font-mono text-sm text-alm-ink-faint opacity-30"
            >
              {d}
            </div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
            const dayIso = toISO(d);
            const isSelected = dayIso === iso;
            const isTodayDay = dayIso === today;
            const isFutureDay = dayIso > today;
            return (
              <Button
                key={`d-${d}`}
                variant="ghost"
                onClick={() => handleSelect(d)}
                disabled={isFutureDay}
                className={`h-14 w-full rounded-md font-mono text-sm border transition-colors ${
                  isSelected
                    ? "bg-alm-accent text-[oklch(0.13_0.015_245)] font-semibold border-alm-accent hover:bg-alm-accent"
                    : isTodayDay
                      ? "border-alm-accent text-alm-accent"
                      : "border-transparent text-alm-ink-dim"
                }`}
              >
                {d}
              </Button>
            );
          })}

          {trailing.map((d, i) => (
            <div
              key={`t-${i}`}
              className="h-14 rounded-md flex items-center justify-center font-mono text-sm text-alm-ink-faint opacity-30"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Quick picks / type input */}
        <div className="mt-5 pt-[18px] border-t border-[oklch(0.240_0.018_245)]">
          {typeMode ? (
            <div className="flex gap-2">
              <input
                autoFocus
                type="text"
                value={typeInput}
                onChange={(e) => handleDateInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleTypeSubmit();
                  if (e.key === "Escape") setTypeMode(false);
                }}
                placeholder="YYYY-MM-DD"
                className="flex-1 font-mono text-[11px] tracking-[0.1em] px-3 py-1.5 bg-transparent border border-[oklch(0.295_0.020_245)] text-alm-ink rounded-[3px] outline-none focus:border-alm-accent"
              />
              <Button onClick={handleTypeSubmit} disabled={!isTypeInputValid}>Go</Button>
              <Button variant="outline" onClick={() => setTypeMode(false)}>Cancel</Button>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
              <Button variant="outline" size="sm" onClick={goYesterday}>Yesterday</Button>
              <Button variant="outline" size="sm" onClick={goOneYearAgo}>One year ago</Button>
              <Button variant="outline" size="sm" onClick={goRandom}>Random</Button>
              <Button variant="outline" size="sm" onClick={() => setTypeMode(true)}>Type a date…</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
