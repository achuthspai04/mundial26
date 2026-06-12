"use client";

import { useMemo, useState } from "react";
import { Hero } from "@/components/hero";
import { Controls } from "@/components/controls";
import { MatchList } from "@/components/match-list";
import { MatchTable } from "@/components/match-table";
import { TodayMatches } from "@/components/today-matches";
import { KnockoutBanner } from "@/components/knockout-banner";
import { Footer } from "@/components/footer";
import { FeedbackPopup } from "@/components/feedback-popup";
import { matches } from "@/lib/matches";
import { DEFAULT_TIMEZONE, getTimezone } from "@/lib/timezones";
import type { ScheduleView } from "@/lib/view";

export default function Home() {
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const [group, setGroup] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ScheduleView>("cards");

  const timezoneOption = getTimezone(timezone);

  const filteredMatches = useMemo(() => {
    const query = search.trim().toLowerCase();

    return matches.filter((match) => {
      const matchesGroup = group === "All" || match.group === group;
      const matchesSearch =
        query === "" ||
        match.team1.toLowerCase().includes(query) ||
        match.team2.toLowerCase().includes(query);

      return matchesGroup && matchesSearch;
    });
  }, [group, search]);

  return (
    <div className="flex flex-1 flex-col bg-background pb-24 sm:pb-20">
      <Hero />
      <Controls
        timezone={timezone}
        onTimezoneChange={setTimezone}
        group={group}
        onGroupChange={setGroup}
        search={search}
        onSearchChange={setSearch}
        view={view}
        onViewChange={setView}
      />
      <TodayMatches timezone={timezoneOption} />
      {view === "cards" ? (
        <MatchList matches={filteredMatches} timezone={timezoneOption} />
      ) : (
        <MatchTable matches={filteredMatches} timezone={timezoneOption} />
      )}
      <KnockoutBanner />
      <section className="mx-auto w-full max-w-5xl px-4 pb-8 sm:px-6">
        <p className="font-sans text-[13px] font-normal text-mundial-muted">
          Mundial26 shows the complete FIFA World Cup 2026 schedule converted
          to your local timezone. Whether you need the World Cup 2026
          schedule in IST for India, BST for the UK, CET for Europe, ET for
          the US, or GST for the Gulf — all 72 group stage match times
          convert automatically. Add England, Brazil, Argentina, France,
          Germany, Spain, Portugal, or any team&apos;s fixtures directly to
          Google Calendar in one click. The FIFA World Cup 2026 runs from
          June 11 to July 19, 2026 across the United States, Canada and
          Mexico — the largest World Cup in history with 48 teams and 104
          matches.
        </p>
      </section>
      <Footer />
      <FeedbackPopup />
    </div>
  );
}
