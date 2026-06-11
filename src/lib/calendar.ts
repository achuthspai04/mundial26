import { formatInTimeZone } from "date-fns-tz";
import type { Match } from "./matches";

export const MATCH_DURATION_HOURS = 2;

const ICS_DATE_FORMAT = "yyyyMMdd'T'HHmmss'Z'";

function toIcsUtc(date: Date): string {
  return formatInTimeZone(date, "Etc/UTC", ICS_DATE_FORMAT);
}

function getMatchTimes(match: Match): { start: Date; end: Date } {
  const start = new Date(match.utc_datetime);
  const end = new Date(start.getTime() + MATCH_DURATION_HOURS * 60 * 60 * 1000);
  return { start, end };
}

/** Matches application/x-www-form-urlencoded encoding (spaces as "+"). */
function encodeParam(value: string): string {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

export function buildGoogleCalendarUrl(match: Match): string {
  const { start, end } = getMatchTimes(match);

  const text = encodeParam(`Mundial26: ${match.team1} vs ${match.team2}`);
  const dates = `${toIcsUtc(start)}/${toIcsUtc(end)}`;
  const details = encodeParam(`Group ${match.group} | FIFA World Cup 2026`);
  const location = encodeParam(`${match.venue}, ${match.city}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

export function buildWhatsAppShareUrl(match: Match): string {
  const kickoff = new Date(match.utc_datetime);
  const date = formatInTimeZone(kickoff, "Asia/Kolkata", "MMM d, yyyy");
  const time = `${formatInTimeZone(kickoff, "Asia/Kolkata", "h:mm a")} IST`;

  const text = encodeParam(
    `Mundial26: ${match.team1} vs ${match.team2} | Group ${match.group} | ${date} | ${time} | ${match.venue}, ${match.city}\nAdd to your calendar: mundial26.pisharath.dev`
  );

  return `https://wa.me/?text=${text}`;
}

export function buildIcsContent(match: Match): string {
  const { start, end } = getMatchTimes(match);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mundial26//FIFA World Cup 2026 Schedule//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${match.id}@mundial26.pisharath.dev`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:Mundial26: ${match.team1} vs ${match.team2}`,
    `DESCRIPTION:Group ${match.group} | FIFA World Cup 2026`,
    `LOCATION:${match.venue}, ${match.city}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function downloadIcs(match: Match): void {
  const content = buildIcsContent(match);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `mundial26-${match.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
