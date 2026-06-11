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
    <div className="flex flex-1 flex-col bg-background">
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
      <Footer />
      <FeedbackPopup />
    </div>
  );
}
