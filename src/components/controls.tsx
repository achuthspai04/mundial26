"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GROUPS } from "@/lib/matches";
import { GROUP_COLORS } from "@/lib/group-colors";
import { TIMEZONES } from "@/lib/timezones";
import { cn } from "@/lib/utils";
import { Search, LayoutGrid, Table2 } from "lucide-react";
import type { ScheduleView } from "@/lib/view";

interface ControlsProps {
  timezone: string;
  onTimezoneChange: (value: string) => void;
  group: string;
  onGroupChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  view: ScheduleView;
  onViewChange: (value: ScheduleView) => void;
}

export function Controls({
  timezone,
  onTimezoneChange,
  group,
  onGroupChange,
  search,
  onSearchChange,
  view,
  onViewChange,
}: ControlsProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6">
      <div
        className="relative inline-flex w-full self-center rounded-full border border-input bg-muted p-1 sm:w-auto sm:self-start"
        role="group"
        aria-label="Schedule view"
      >
        <span
          className={cn(
            "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-mundial-blue shadow-sm transition-transform duration-300 ease-out",
            view === "table" && "translate-x-full"
          )}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => onViewChange("cards")}
          className={cn(
            "relative z-10 flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full px-4 font-condensed text-base font-semibold transition-colors duration-300 sm:w-32 sm:flex-none",
            view === "cards" ? "text-white" : "text-mundial-muted hover:text-foreground"
          )}
          aria-pressed={view === "cards"}
        >
          <LayoutGrid className="size-4" aria-hidden="true" />
          Cards
        </button>
        <button
          type="button"
          onClick={() => onViewChange("table")}
          className={cn(
            "relative z-10 flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full px-4 font-condensed text-base font-semibold transition-colors duration-300 sm:w-32 sm:flex-none",
            view === "table" ? "text-white" : "text-mundial-muted hover:text-foreground"
          )}
          aria-pressed={view === "table"}
        >
          <Table2 className="size-4" aria-hidden="true" />
          Table
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-mundial-muted"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by team name…"
            aria-label="Search by team name"
            className="h-11 pl-9"
          />
        </div>

        <Select
          value={timezone}
          onValueChange={(value) => {
            if (value) onTimezoneChange(value);
          }}
        >
          <SelectTrigger className="h-11 w-full sm:w-56" aria-label="Select timezone">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by group">
        <Button
          variant={group === "All" ? "default" : "outline"}
          onClick={() => onGroupChange("All")}
          className={cn(
            "h-11 min-w-11 px-4 font-condensed text-base font-normal",
            group === "All" && "bg-mundial-blue text-white hover:bg-mundial-blue/90"
          )}
        >
          All
        </Button>
        {GROUPS.map((g) => (
          <Button
            key={g}
            variant={group === g ? "default" : "outline"}
            onClick={() => onGroupChange(g)}
            className={cn(
              "h-11 min-w-11 px-3 font-condensed text-base font-normal",
              group === g && "text-white hover:opacity-90"
            )}
            style={group === g ? { backgroundColor: GROUP_COLORS[g] } : undefined}
          >
            {g}
          </Button>
        ))}
      </div>
    </section>
  );
}
