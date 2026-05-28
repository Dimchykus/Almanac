"use client";

import { useState } from "react";
import { TopBar } from "../../components/top-bar";
import { DateHeader } from "../../components/date-header";
import { ApodCard } from "../../components/apod-card";
import { FactCard } from "../../components/fact-card";
import { WeatherCard } from "../../components/weather-card";
import { SunMoonCard } from "../../components/sun-moon-card";
import { EventsCard } from "../../components/events-card";
import { PeopleCard } from "../../components/people-card";
import { BookmarksPanel } from "../../components/bookmarks-panel";
import { DatePickerModal } from "../../components/date-picker-modal";
import { useSyncedSources } from "@/src/hooks/use-synced-sources";

export function BriefingPage() {
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const { sources } = useSyncedSources();

  return (
    <div
      className="relative min-h-screen bg-alm-bg text-alm-ink font-sans antialiased"
      style={{ fontFeatureSettings: '"ss01", "cv11", "tnum"' }}
    >
      <div className="alm-starfield" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopBar
          bookmarksOpen={bookmarksOpen}
          onToggleBookmarks={() => setBookmarksOpen((v) => !v)}
        />

        <DateHeader onPickerOpen={() => setPickerOpen(true)} />

        <main className="px-4 sm:px-8 py-5 sm:py-7 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 overflow-x-hidden">
          <div>
            <ApodCard />
          </div>

          <div className="flex flex-col gap-5">
            <FactCard />
            <WeatherCard />
            <SunMoonCard />
          </div>
        </main>
        <section className="px-4 sm:px-8 pb-8 sm:pb-12">
          <EventsCard />
        </section>
        <section className="px-4 sm:px-8 pb-8 sm:pb-12">
          <PeopleCard />
        </section>
        <footer className="px-4 sm:px-8 py-6 sm:py-7 pb-8 sm:pb-9 border-t border-[oklch(0.240_0.018_245)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 font-mono text-[10px] tracking-[0.14em] uppercase text-alm-ink-faint mt-auto">
          <p>Almanac</p>
          <div className="flex gap-[18px]">
            {sources.map(({ name, synced }) => (
              <span
                key={name}
                className={`before:content-['●'] before:mr-1.5 ${
                  synced
                    ? "text-alm-ink-mute before:text-alm-positive"
                    : "text-alm-ink-faint before:text-alm-ink-faint"
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        </footer>
      </div>
      {bookmarksOpen && (
        <BookmarksPanel onClose={() => setBookmarksOpen(false)} />
      )}
      {pickerOpen && <DatePickerModal onClose={() => setPickerOpen(false)} />}
    </div>
  );
}
