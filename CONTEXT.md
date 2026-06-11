# Mundial26 — FIFA World Cup 2026 Group Stage Schedule App

## App name
**Mundial26**

## Deployment URL
`mundial26.pisharath.dev`

## What this is

A single-page Next.js app showing the complete FIFA World Cup 2026 group stage schedule. Users pick their timezone, filter by group or team, toggle between card and table view, and add any match to their calendar in one click. No backend. No auth. Pure static.

---

## Stack

- **Framework**: Next.js (App Router), static export
- **UI**: shadcn/ui throughout
- **Timezone**: `date-fns-tz`
- **Styling**: Tailwind CSS
- **Data**: Hardcoded TS array — no API, no DB
- **Hosting**: Cloudflare Pages

---

## Official assets (already in `/public/`)

### Logos
- `Orientation_Horizontal__Colour_White.png` — wide horizontal lockup (trophy + "26" + "FIFA WORLD CUP 2026"). Use in header on desktop. Height 60px.
- `26_Logo__1_.png` — compact vertical logo (trophy inside "26" + "FIFA" below). Use in header on mobile (< 640px). Also use as favicon.

Both served locally from `/public/`. Do not hotlink.

### Favicon
```html
<link rel="icon" type="image/png" href="/26_Logo__1_.png" />
```

---

## Typography

### Display: FWC2026 (official FIFA tournament typeface)
- Download from: https://exfont.com/font-family/fwc2026
- Self-host at `/public/fonts/FWC2026.woff2`
- Register in `globals.css`:
```css
@font-face {
  font-family: 'FWC2026';
  src: url('/fonts/FWC2026.woff2') format('woff2');
  font-weight: normal;
  font-display: swap;
}
```
- Apply to: hero headline, team names, group badges, date section headers

### Body: Noto Sans (official FIFA UI font)
- Google Fonts: `https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&display=swap`
- Apply to: kickoff times, venue, city, controls, buttons, table content

No other fonts. No Inter, no Barlow, no system sans.

---

## Color palette

### Base
- **Dark bg (header)**: `#0A1128`
- **Primary blue**: `#1A3F8F`
- **Primary red**: `#C8102E`
- **White**: `#FFFFFF`
- **Muted text**: `#6B7280`
- **Page bg**: `#F7F7F8`

### Group badge colors (official from FIFA Figma)
Each group has a unique official color. Badge bg = color below, text = white, font = FWC2026.

| Group | Color name | Hex |
|-------|------------|-----|
| A | Coral Orange | `#FF6B35` |
| B | Red | `#C8102E` |
| C | Blue | `#1A3F8F` |
| D | Navy | `#0A1128` |
| E | Purple | `#6B21A8` |
| F | Teal | `#0F766E` |
| G | Deep Orange | `#EA580C` |
| H | Amber | `#D97706` |
| I | Cyan | `#0891B2` |
| J | Green | `#16A34A` |
| K | Crimson | `#BE185D` |
| L | Lime | `#65A30D` |

---

## Hero (top of page — no separate landing page)

Dark background `#0A1128`. Full width.

**Desktop:**
- Left aligned: `Orientation_Horizontal__Colour_White.png` at 60px height
- Centered below: hero line in FWC2026 font, white, 48px: **"Every match. Your timezone. Your calendar."**

**Mobile (< 640px):**
- Centered: `26_Logo__1_.png` at 80px height
- Below: same hero line, FWC2026, white, 28px

Immediately below hero: controls bar + schedule. No extra scroll, no marketing copy, no separate route.

---

## Controls bar

Below hero, above schedule. All four controls in one row on desktop. Stack vertically on mobile.

- **View toggle**: segmented control — "Cards" | "Table". Default: Cards. Put this first/leftmost.
- **Timezone selector**: shadcn `<Select>`. Default `Asia/Kolkata` (IST). Options:
  - IST — Asia/Kolkata
  - GMT — Etc/GMT
  - BST — Europe/London
  - CET — Europe/Paris
  - ET — America/New_York
  - CST — America/Chicago
  - PT — America/Los_Angeles
  - JST — Asia/Tokyo
  - SGT — Asia/Singapore
- **Group filter**: pill buttons A–L + "All". Active state = group's official badge color bg + white text. Inactive = outlined.
- **Search**: live text input, shadcn `<Input>`, filter by team name, case insensitive. Works simultaneously with group filter.

---

## Schedule — Card view (default)

Matches grouped by **converted local date** (not UTC date — a 23:00 UTC match may fall on the next calendar day in IST; handle this correctly using date-fns-tz).

**Date section header**: FWC2026 font, primary blue `#1A3F8F`, uppercase. e.g. "FRIDAY, JUNE 12, 2026"

**Match card** (shadcn `<Card>`):
- Group badge top-left: group letter, official group color bg, white FWC2026 text
- **Team 1** `vs` **Team 2** — FWC2026 font, large. "vs" in red `#C8102E`
- Kickoff time in selected timezone — Noto Sans, medium weight
- Venue, City — Noto Sans, muted `#6B7280`
- Two buttons:
  - "Add to Google Calendar" — primary blue bg, white text, opens GCal URL in new tab
  - "Download .ics" — outlined, triggers Blob download
  - Side by side on desktop. Stacked vertically on mobile.

Desktop: 2-column card grid. Mobile: single column.

---

## Schedule — Table view

shadcn `<Table>`. Toggled via view control.

Columns:
| Group | Teams | Date | Time | Venue | City | Calendar |

- **Group**: colored badge (same as card view)
- **Teams**: "Team 1 vs Team 2" in FWC2026 font. "vs" in red.
- **Date**: converted local date in selected timezone
- **Time**: converted local time in selected timezone
- **Venue**: Noto Sans
- **City**: Noto Sans, muted
- **Calendar**: two icon buttons — GCal icon + .ics icon, both with tooltips

Table sortable by Date (default ascending). Wrap in `overflow-x: auto` on mobile.

Both card view and table view respect the active timezone, group filter, and search simultaneously.

---

## Knockout stage placeholder

Bottom of page. Teaser card style — NOT an error or empty state. Make it feel like "coming soon":
- Dark accent border
- Trophy icon
- FWC2026 font heading: "KNOCKOUT STAGE"
- Noto Sans body: "Round of 32, Round of 16, Quarterfinals, Semifinals, and the Final schedules will be updated here once the group stage concludes on June 27, 2026."

---

## Calendar integration

### Google Calendar URL (open in new tab, no auth)
```
https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mundial26%3A+[Team1]+vs+[Team2]&dates=[YYYYMMDDTHHMMSSZ]/[YYYYMMDDTHHMMSSZ]&details=Group+[X]+%7C+FIFA+World+Cup+2026&location=[Venue]%2C+[City]
```

### ICS (client-side Blob, no server)
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mundial26//EN
BEGIN:VEVENT
DTSTART:[YYYYMMDDTHHMMSSZ]
DTEND:[YYYYMMDDTHHMMSSZ]
SUMMARY:Mundial26: [Team1] vs [Team2]
DESCRIPTION:Group [X] | FIFA World Cup 2026
LOCATION:[Venue], [City]
END:VEVENT
END:VCALENDAR
```
Match duration: 2 hours. Trigger via `URL.createObjectURL(blob)`.

---

## Full match data — all 72 group stage fixtures

Hardcode as a typed TS array `matches: Match[]` in `/lib/matches.ts`.

```ts
type Match = {
  id: string
  group: string
  team1: string
  team2: string
  utc_datetime: string // ISO 8601 UTC
  venue: string
  city: string
}
```

| # | Group | Team 1 | Team 2 | UTC Kickoff | Venue | City |
|---|-------|--------|--------|-------------|-------|------|
| 1 | A | Mexico | South Africa | 2026-06-11T19:00Z | Mexico City Stadium | Mexico City |
| 2 | A | South Korea | Czechia | 2026-06-12T02:00Z | Estadio Guadalajara | Zapopan |
| 3 | B | Canada | Bosnia | 2026-06-12T19:00Z | Toronto Stadium | Toronto |
| 4 | D | USA | Paraguay | 2026-06-13T01:00Z | Los Angeles Stadium | Los Angeles |
| 5 | B | Qatar | Switzerland | 2026-06-13T19:00Z | SF Bay Area Stadium | San Francisco |
| 6 | C | Brazil | Morocco | 2026-06-13T22:00Z | NY NJ Stadium | New Jersey |
| 7 | C | Haiti | Scotland | 2026-06-14T01:00Z | Boston Stadium | Boston |
| 8 | D | Australia | Turkiye | 2026-06-14T04:00Z | BC Place | Vancouver |
| 9 | E | Germany | Curacao | 2026-06-14T17:00Z | Houston Stadium | Houston |
| 10 | F | Netherlands | Japan | 2026-06-14T20:00Z | Dallas Stadium | Dallas |
| 11 | E | Ivory Coast | Ecuador | 2026-06-14T23:00Z | Philadelphia Stadium | Philadelphia |
| 12 | F | Sweden | Tunisia | 2026-06-15T02:00Z | Estadio Monterrey | Guadalupe |
| 13 | H | Spain | Cape Verde | 2026-06-15T16:00Z | Atlanta Stadium | Atlanta |
| 14 | G | Belgium | Egypt | 2026-06-15T19:00Z | BC Place | Vancouver |
| 15 | H | Saudi Arabia | Uruguay | 2026-06-15T22:00Z | Miami Stadium | Miami |
| 16 | G | Iran | New Zealand | 2026-06-16T01:00Z | Los Angeles Stadium | Los Angeles |
| 17 | I | France | Senegal | 2026-06-16T19:00Z | NY NJ Stadium | New Jersey |
| 18 | I | Iraq | Norway | 2026-06-16T22:00Z | Boston Stadium | Boston |
| 19 | J | Argentina | Algeria | 2026-06-17T01:00Z | Kansas City Stadium | Kansas City |
| 20 | J | Austria | Jordan | 2026-06-17T04:00Z | SF Bay Area Stadium | San Francisco |
| 21 | K | Portugal | DR Congo | 2026-06-17T17:00Z | Houston Stadium | Houston |
| 22 | L | England | Croatia | 2026-06-17T20:00Z | Dallas Stadium | Dallas |
| 23 | L | Ghana | Panama | 2026-06-17T23:00Z | Toronto Stadium | Toronto |
| 24 | K | Uzbekistan | Colombia | 2026-06-18T02:00Z | Mexico City Stadium | Mexico City |
| 25 | A | Czechia | South Africa | 2026-06-18T16:00Z | Atlanta Stadium | Atlanta |
| 26 | B | Switzerland | Bosnia | 2026-06-18T19:00Z | Los Angeles Stadium | Los Angeles |
| 27 | B | Canada | Qatar | 2026-06-18T22:00Z | BC Place | Vancouver |
| 28 | A | Mexico | South Korea | 2026-06-19T01:00Z | Estadio Guadalajara | Zapopan |
| 29 | C | Scotland | Morocco | 2026-06-19T22:00Z | Boston Stadium | Boston |
| 30 | D | USA | Australia | 2026-06-19T19:00Z | Seattle Stadium | Seattle |
| 31 | C | Brazil | Haiti | 2026-06-20T00:30Z | Philadelphia Stadium | Philadelphia |
| 32 | D | Turkiye | Paraguay | 2026-06-20T03:00Z | SF Bay Area Stadium | San Francisco |
| 33 | F | Netherlands | Sweden | 2026-06-20T17:00Z | Houston Stadium | Houston |
| 34 | E | Germany | Ivory Coast | 2026-06-20T20:00Z | Toronto Stadium | Toronto |
| 35 | E | Ecuador | Curacao | 2026-06-21T03:00Z | Kansas City Stadium | Kansas City |
| 36 | F | Tunisia | Japan | 2026-06-21T04:00Z | Estadio Monterrey | Guadalupe |
| 37 | H | Spain | Saudi Arabia | 2026-06-21T16:00Z | Atlanta Stadium | Atlanta |
| 38 | G | Belgium | Iran | 2026-06-21T19:00Z | Los Angeles Stadium | Los Angeles |
| 39 | H | Uruguay | Cape Verde | 2026-06-21T22:00Z | Miami Stadium | Miami |
| 40 | G | New Zealand | Egypt | 2026-06-22T01:00Z | BC Place | Vancouver |
| 41 | J | Argentina | Austria | 2026-06-22T17:00Z | Dallas Stadium | Dallas |
| 42 | I | France | Iraq | 2026-06-22T21:00Z | Philadelphia Stadium | Philadelphia |
| 43 | I | Norway | Senegal | 2026-06-23T00:00Z | NY NJ Stadium | New Jersey |
| 44 | J | Jordan | Algeria | 2026-06-23T03:00Z | SF Bay Area Stadium | San Francisco |
| 45 | K | Portugal | Uzbekistan | 2026-06-23T17:00Z | Houston Stadium | Houston |
| 46 | L | England | Ghana | 2026-06-23T20:00Z | Boston Stadium | Boston |
| 47 | L | Panama | Croatia | 2026-06-23T23:00Z | Toronto Stadium | Toronto |
| 48 | K | Colombia | DR Congo | 2026-06-24T02:00Z | Estadio Guadalajara | Zapopan |
| 49 | B | Switzerland | Canada | 2026-06-24T19:00Z | BC Place | Vancouver |
| 50 | B | Bosnia | Qatar | 2026-06-24T19:00Z | Seattle Stadium | Seattle |
| 51 | C | Scotland | Brazil | 2026-06-24T22:00Z | Miami Stadium | Miami |
| 52 | C | Morocco | Haiti | 2026-06-24T22:00Z | Atlanta Stadium | Atlanta |
| 53 | A | Czechia | Mexico | 2026-06-25T01:00Z | Mexico City Stadium | Mexico City |
| 54 | A | South Africa | South Korea | 2026-06-25T01:00Z | Estadio Monterrey | Guadalupe |
| 55 | E | Ecuador | Germany | 2026-06-25T20:00Z | NY NJ Stadium | New Jersey |
| 56 | E | Curacao | Ivory Coast | 2026-06-25T20:00Z | Philadelphia Stadium | Philadelphia |
| 57 | F | Japan | Sweden | 2026-06-25T23:00Z | Dallas Stadium | Dallas |
| 58 | F | Tunisia | Netherlands | 2026-06-25T23:00Z | Kansas City Stadium | Kansas City |
| 59 | D | Turkiye | USA | 2026-06-26T02:00Z | Los Angeles Stadium | Los Angeles |
| 60 | D | Paraguay | Australia | 2026-06-26T02:00Z | SF Bay Area Stadium | San Francisco |
| 61 | I | Norway | France | 2026-06-26T19:00Z | Boston Stadium | Boston |
| 62 | I | Senegal | Iraq | 2026-06-26T19:00Z | Toronto Stadium | Toronto |
| 63 | H | Cape Verde | Saudi Arabia | 2026-06-27T00:00Z | Houston Stadium | Houston |
| 64 | H | Uruguay | Spain | 2026-06-27T00:00Z | Estadio Guadalajara | Zapopan |
| 65 | G | Egypt | Belgium | 2026-06-27T00:00Z | Kansas City Stadium | Kansas City |
| 66 | G | New Zealand | Iran | 2026-06-27T00:00Z | Seattle Stadium | Seattle |
| 67 | J | Algeria | Argentina | 2026-06-27T20:00Z | Dallas Stadium | Dallas |
| 68 | J | Jordan | Austria | 2026-06-27T20:00Z | NY NJ Stadium | New Jersey |
| 69 | K | DR Congo | Portugal | 2026-06-27T23:00Z | Miami Stadium | Miami |
| 70 | K | Colombia | Uzbekistan | 2026-06-27T23:00Z | Atlanta Stadium | Atlanta |
| 71 | L | Croatia | England | 2026-06-28T02:00Z | Los Angeles Stadium | Los Angeles |
| 72 | L | Panama | Ghana | 2026-06-28T02:00Z | SF Bay Area Stadium | San Francisco |

---

## Mobile requirements

- Single column card grid on mobile
- Header: horizontal logo on desktop, vertical compact logo on mobile, both centered
- Controls bar stacks vertically on mobile
- Group filter pills wrap on mobile
- Card buttons stack vertically on mobile
- Table view: `overflow-x: auto` wrapper on mobile
- Minimum tap target: 44px on all interactive elements
- Zero horizontal overflow at 375px, 390px, 768px

---

## What is NOT in scope (v1)

- No knockout stage data (placeholder only)
- No live scores
- No user accounts
- No backend or API
- No notifications
- No social sharing

---

## Note on branding

FIFA World Cup 2026 logos and trademarks used for fan/informational purposes only.
