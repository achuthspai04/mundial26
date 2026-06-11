"use client";

import { useMemo } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { sendGAEvent } from "@next/third-parties/google";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  buildGoogleCalendarUrl,
  buildWhatsAppShareUrl,
  downloadIcs,
} from "@/lib/calendar";
import { GROUP_COLORS } from "@/lib/group-colors";
import { cn } from "@/lib/utils";
import type { Match } from "@/lib/matches";
import type { TimezoneOption } from "@/lib/timezones";
import { CalendarPlus, Download } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

interface MatchTableProps {
  matches: Match[];
  timezone: TimezoneOption;
}

export function MatchTable({ matches, timezone }: MatchTableProps) {
  const sortedMatches = useMemo(
    () =>
      [...matches].sort(
        (a, b) =>
          new Date(a.utc_datetime).getTime() -
          new Date(b.utc_datetime).getTime()
      ),
    [matches]
  );

  if (sortedMatches.length === 0) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-12 text-center text-mundial-muted sm:px-6">
        No matches found. Try a different search or group filter.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-8 sm:px-6">
      <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Calendar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMatches.map((match) => {
              const kickoff = new Date(match.utc_datetime);
              const date = formatInTimeZone(kickoff, timezone.iana, "MMM d, yyyy");
              const time = `${formatInTimeZone(kickoff, timezone.iana, "h:mm a")} ${timezone.value}`;

              return (
                <TableRow key={match.id}>
                  <TableCell>
                    <Badge
                      className="rounded-md px-2.5 py-1 font-sans text-[15px] font-semibold tracking-wide text-white"
                      style={{ backgroundColor: GROUP_COLORS[match.group] }}
                    >
                      {match.group}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-condensed text-[21px] font-normal tracking-[0.02em]">
                    {match.team1} <span className="text-mundial-red">vs</span>{" "}
                    {match.team2}
                  </TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{time}</TableCell>
                  <TableCell className="text-mundial-muted">{match.venue}</TableCell>
                  <TableCell className="text-mundial-muted">{match.city}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <a
                              href={buildGoogleCalendarUrl(match)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Add to Google Calendar"
                              onClick={() =>
                                sendGAEvent("event", "gcal_click", {
                                  match_id: match.id,
                                  group: match.group,
                                  team1: match.team1,
                                  team2: match.team2,
                                })
                              }
                              className={cn(
                                buttonVariants({ variant: "outline", size: "icon" }),
                                "h-12 w-12 sm:size-11"
                              )}
                            >
                              <CalendarPlus className="size-4" aria-hidden="true" />
                            </a>
                          }
                        />
                        <TooltipContent>Add to Google Calendar</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <button
                              type="button"
                              onClick={() => {
                                sendGAEvent("event", "ics_download", {
                                  match_id: match.id,
                                  group: match.group,
                                  team1: match.team1,
                                  team2: match.team2,
                                });
                                downloadIcs(match);
                              }}
                              aria-label="Download .ics"
                              className={cn(
                                buttonVariants({ variant: "outline", size: "icon" }),
                                "h-12 w-12 sm:size-11"
                              )}
                            >
                              <Download className="size-4" aria-hidden="true" />
                            </button>
                          }
                        />
                        <TooltipContent>Download .ics</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <a
                              href={buildWhatsAppShareUrl(match)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Share on WhatsApp"
                              onClick={() =>
                                sendGAEvent("event", "whatsapp_share", {
                                  match_id: match.id,
                                  group: match.group,
                                  team1: match.team1,
                                  team2: match.team2,
                                })
                              }
                              className={cn(
                                buttonVariants({ variant: "outline", size: "icon" }),
                                "h-12 w-12 sm:size-11"
                              )}
                            >
                              <WhatsAppIcon className="size-4" />
                            </a>
                          }
                        />
                        <TooltipContent>Share on WhatsApp</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
