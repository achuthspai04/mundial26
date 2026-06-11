"use client";

import { formatInTimeZone } from "date-fns-tz";
import { MatchCard } from "@/components/match-card";
import { matches } from "@/lib/matches";
import type { TimezoneOption } from "@/lib/timezones";

interface TodayMatchesProps {
  timezone: TimezoneOption;
}

export function TodayMatches({ timezone }: TodayMatchesProps) {
  const todayKey = formatInTimeZone(new Date(), timezone.iana, "yyyy-MM-dd");

  const todayMatches = matches.filter(
    (match) =>
      formatInTimeZone(new Date(match.utc_datetime), timezone.iana, "yyyy-MM-dd") ===
      todayKey
  );

  if (todayMatches.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 pt-2 pb-4 sm:px-6">
      <h2 className="flex items-center gap-2 font-condensed text-xl font-bold tracking-wide text-mundial-blue uppercase sm:text-2xl">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
        </span>
        Today
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {todayMatches.map((match) => (
          <MatchCard key={match.id} match={match} timezone={timezone} />
        ))}
      </div>
    </section>
  );
}
