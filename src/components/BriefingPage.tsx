"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { DateHeader } from "./DateHeader";
import { ApodCard } from "./ApodCard";
import { FactCard } from "./FactCard";
import { WeatherCard } from "./WeatherCard";
import { SunMoonCard } from "./SunMoonCard";
import { EventsCard } from "./EventsCard";
import { PeopleCard } from "./PeopleCard";
import { FeaturedCard } from "./FeaturedCard";
import { BookmarksPanel } from "./BookmarksPanel";
import { DatePickerModal } from "./DatePickerModal";
import { ALMANAC_DATA } from "./data";

export function BriefingPage() {
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const d = ALMANAC_DATA;

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

        <DateHeader
          onPickerOpen={() => setPickerOpen(true)}
        />

        <main className="px-8 py-7 grid grid-cols-[2fr_1fr] gap-5">
          <div>
            <ApodCard />
          </div>

          <div className="flex flex-col gap-5">
            <FactCard date={d.date} fact={d.fact} />
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

        {/* Featured entity — full width */}
        <section className="px-8 pb-12">
          <FeaturedCard featured={d.featured} />
        </section>

        {/* Footer */}
        <footer className="px-8 py-7 pb-9 border-t border-[oklch(0.240_0.018_245)] flex justify-between items-center font-mono text-[10px] tracking-[0.14em] uppercase text-alm-ink-faint mt-auto">
          <div>Almanac · Observatory build · v0.4.1</div>
          <div className="flex gap-[18px]">
            {["NASA APOD", "Wikipedia", "Open-Meteo", "Numbers API"].map(
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
