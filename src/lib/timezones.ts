export interface TimezoneOption {
  /** Common abbreviation shown in the UI */
  value: string;
  /** IANA timezone identifier used for date-fns-tz conversions */
  iana: string;
  /** Human readable label for the dropdown */
  label: string;
}

export const TIMEZONES: TimezoneOption[] = [
  { value: "IST", iana: "Asia/Kolkata", label: "IST — India Standard Time" },
  { value: "GMT", iana: "Etc/UTC", label: "GMT — Greenwich Mean Time" },
  { value: "ET", iana: "America/New_York", label: "ET — Eastern Time" },
  { value: "PT", iana: "America/Los_Angeles", label: "PT — Pacific Time" },
  { value: "CST", iana: "America/Chicago", label: "CST — Central Time" },
  { value: "BST", iana: "Europe/London", label: "BST — British Summer Time" },
  { value: "CET", iana: "Europe/Berlin", label: "CET — Central European Time" },
  { value: "JST", iana: "Asia/Tokyo", label: "JST — Japan Standard Time" },
  { value: "SGT", iana: "Asia/Singapore", label: "SGT — Singapore Time" },
];

export const DEFAULT_TIMEZONE = "IST";

export function getTimezone(value: string): TimezoneOption {
  return TIMEZONES.find((tz) => tz.value === value) ?? TIMEZONES[0];
}
