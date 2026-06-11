"use client";

import { memo } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { sendGAEvent } from "@next/third-parties/google";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface MatchCardProps {
  match: Match;
  timezone: TimezoneOption;
}

export const MatchCard = memo(function MatchCard({
  match,
  timezone,
}: MatchCardProps) {
  const kickoff = new Date(match.utc_datetime);
  const time = formatInTimeZone(kickoff, timezone.iana, "h:mm a");

  return (
    <Card className="gap-3 p-4 sm:p-5">
      <CardContent className="flex flex-col gap-3 px-0">
        <Badge
          className="w-fit rounded-md px-2.5 py-1 font-sans text-[15px] font-semibold tracking-wide text-white"
          style={{ backgroundColor: GROUP_COLORS[match.group] }}
        >
          Group {match.group}
        </Badge>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center font-condensed text-[25px] font-medium tracking-[0.02em] text-foreground sm:text-[31px]">
          <span>{match.team1}</span>
          <span className="text-mundial-red">vs</span>
          <span>{match.team2}</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-condensed text-[20px] font-extralight text-foreground">
            {time} {timezone.value}
          </span>
          <span className="text-sm text-mundial-muted">
            {match.venue}, {match.city}
          </span>
        </div>

        <div className="mt-1 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <a
            href={buildGoogleCalendarUrl(match)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              sendGAEvent("event", "gcal_click", {
                match_id: match.id,
                group: match.group,
                team1: match.team1,
                team2: match.team2,
              })
            }
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 w-full bg-mundial-blue text-white transition-colors hover:bg-blue-700 sm:h-10 sm:w-auto sm:flex-1"
            )}
          >
            <CalendarPlus className="size-4" aria-hidden="true" />
            Add to Google Calendar
          </a>
          <div className="flex w-full gap-2 sm:contents">
            <Button
              variant="outline"
              onClick={() => {
                sendGAEvent("event", "ics_download", {
                  match_id: match.id,
                  group: match.group,
                  team1: match.team1,
                  team2: match.team2,
                });
                downloadIcs(match);
              }}
              className="h-12 flex-[3] sm:h-10 sm:w-auto sm:flex-1"
            >
              <Download className="size-4" aria-hidden="true" />
              Download .ics
            </Button>
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
                      buttonVariants({ variant: "outline" }),
                      "h-12 flex-1 border border-[#25D366] sm:h-10 sm:w-10 sm:flex-none sm:px-0"
                    )}
                  >
                    <WhatsAppIcon className="size-4" />
                  </a>
                }
              />
              <TooltipContent>Share on WhatsApp</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
