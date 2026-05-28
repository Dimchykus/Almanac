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

export function BriefingPage() {
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen bg-alm-bg text-alm-ink font-sans antialiased overflow-x-hidden"
      style={{ fontFeatureSettings: '"ss01", "cv11", "tnum"' }}
    >
      {/* Star-grid backdrop */}
      <div className="alm-starfield" />

      {/* All content above the backdrop */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopBar
          bookmarksOpen={bookmarksOpen}
          onToggleBookmarks={() => setBookmarksOpen((v) => !v)}
        />

        <DateHeader onPickerOpen={() => setPickerOpen(true)} />

        <main className="px-8 py-7 grid grid-cols-[2fr_1fr] gap-5">
          <div>
            <ApodCard />
          </div>

          <div className="flex flex-col gap-5">
            <FactCard />
            <WeatherCard />
            <SunMoonCard />
          </div>
        </main>

        {/* On This Day — full width */}
        <section className="px-8 pb-12">
          <EventsCard />
        </section>

        {/* Births & Deaths — full width */}
        <section className="px-8 pb-12">
          <PeopleCard />
        </section>

        {/* Footer */}
        <footer className="px-8 py-7 pb-9 border-t border-[oklch(0.240_0.018_245)] flex justify-between items-center font-mono text-[10px] tracking-[0.14em] uppercase text-alm-ink-faint mt-auto">
          <div>Almanac · Observatory build · v0.4.1</div>
          <div className="flex gap-[18px]">
            {["NASA APOD", "Wikipedia", "Open-Meteo", "OpenAI"].map(
              (src) => (
                <span
                  key={src}
                  className="text-alm-ink-mute before:content-['●'] before:mr-1.5 before:text-alm-positive"
                >
                  {src}
                </span>
              ),
            )}
          </div>
        </footer>
      </div>

      {/* Overlays */}
      {bookmarksOpen && (
        <BookmarksPanel onClose={() => setBookmarksOpen(false)} />
      )}
      {pickerOpen && <DatePickerModal onClose={() => setPickerOpen(false)} />}
    </div>
  );
}
