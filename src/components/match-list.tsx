"use client";

import { formatInTimeZone } from "date-fns-tz";
import { MatchCard } from "@/components/match-card";
import type { Match } from "@/lib/matches";
import type { TimezoneOption } from "@/lib/timezones";

interface MatchListProps {
  matches: Match[];
  timezone: TimezoneOption;
}

interface MatchGroup {
  key: string;
  heading: string;
  matches: Match[];
}

function groupMatchesByLocalDate(
  matches: Match[],
  timezone: TimezoneOption
): MatchGroup[] {
  const groups = new Map<string, MatchGroup>();

  for (const match of matches) {
    const date = new Date(match.utc_datetime);
    const key = formatInTimeZone(date, timezone.iana, "yyyy-MM-dd");

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        heading: formatInTimeZone(date, timezone.iana, "EEEE, MMMM d, yyyy"),
        matches: [],
      });
    }

    groups.get(key)!.matches.push(match);
  }

  return Array.from(groups.values());
}

export function MatchList({ matches, timezone }: MatchListProps) {
  const groups = groupMatchesByLocalDate(matches, timezone);
  const todayKey = formatInTimeZone(new Date(), timezone.iana, "yyyy-MM-dd");

  if (groups.length === 0) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-12 text-center text-mundial-muted sm:px-6">
        No matches found. Try a different search or group filter.
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-8 sm:px-6">
      {groups.map((group) => (
        <section key={group.key} className="flex flex-col gap-3">
          <h2 className="flex flex-wrap items-center gap-2 font-condensed text-xl font-bold uppercase tracking-wide text-mundial-blue sm:text-2xl">
            {group.heading}
            {group.key === todayKey && (
              <span className="rounded-full bg-mundial-blue/10 px-2.5 py-0.5 font-sans text-xs font-semibold normal-case tracking-normal text-mundial-blue">
                Today
              </span>
            )}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {group.matches.map((match) => (
              <MatchCard key={match.id} match={match} timezone={timezone} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
