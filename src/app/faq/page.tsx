import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ — Mundial26 | FIFA World Cup 2026 Schedule Questions",
  description:
    "Answers to common questions about FIFA World Cup 2026 match times in IST, BST, CET, ET and more, plus how to add matches to Google Calendar, Apple Calendar and Outlook.",
  alternates: {
    canonical: "https://mundial26.pisharath.dev/faq",
  },
};

interface Faq {
  question: string;
  answer: string;
}

const TIMEZONE_FAQS: Faq[] = [
  {
    question: "What time are FIFA World Cup 2026 matches in India (IST)?",
    answer:
      "Most FIFA World Cup 2026 matches kick off between 12:30 AM IST and 6:30 AM IST due to the tournament being hosted across the United States, Canada and Mexico. Matches start at 12:30 AM, 3:00 AM, and 6:30 AM IST. Use Mundial26 to see all 72 group stage matches automatically converted to IST — just open mundial26.pisharath.dev, it defaults to IST.",
  },
  {
    question: "What time are FIFA World Cup 2026 matches in the UK (BST)?",
    answer:
      "UK fans face some of the toughest scheduling — nearly half of the 72 group stage matches kick off between midnight and 5am BST. Matches start at 1am, 3am, and 6am BST. Some daytime matches kick off at 8pm and 11pm BST. Select BST in Mundial26 to see the full schedule.",
  },
  {
    question: "What time are FIFA World Cup 2026 matches in Europe (CET)?",
    answer:
      "European fans see kickoffs at 1am, 2am, 4am, and 7am CET for most group stage matches. Select CET in Mundial26 to convert all 72 matches automatically.",
  },
  {
    question:
      "What time are FIFA World Cup 2026 matches in the UAE and Gulf (GST)?",
    answer:
      "Gulf fans see matches at roughly 3am, 5am, and 8am GST. Select GST in Mundial26 for the full schedule in Gulf Standard Time.",
  },
  {
    question:
      "What time are FIFA World Cup 2026 matches in the US Eastern timezone (ET)?",
    answer:
      "US Eastern fans have some of the best viewing times — matches at 3pm, 6pm, 9pm, and midnight ET. Select ET in Mundial26 for the full schedule.",
  },
  {
    question: "What time are FIFA World Cup 2026 matches in Australia (AEST)?",
    answer:
      "Australian fans see matches at roughly 11am, 1pm, 4pm, and 7pm AEST — excellent viewing times. Add AEST to the Mundial26 timezone dropdown.",
  },
  {
    question:
      "What time are FIFA World Cup 2026 matches in Nigeria and West Africa (WAT)?",
    answer:
      "West African fans see matches at roughly 4am, 7am, and 10am WAT. Use Mundial26 and select GMT for the closest conversion.",
  },
  {
    question: "What time are FIFA World Cup 2026 matches in Saudi Arabia (AST)?",
    answer:
      "Saudi fans see matches at roughly 4am, 7am, and 10am AST. Select AST in Mundial26 for the full schedule.",
  },
];

const TEAM_FAQS: Faq[] = [
  {
    question: "What time is England vs Croatia at the World Cup 2026 in the UK?",
    answer:
      "England vs Croatia kicks off June 17, 2026 at 4:00 PM ET which is 9:00 PM BST on June 17. Use Mundial26 and select BST to see all England group stage matches.",
  },
  {
    question: "What time are England's World Cup 2026 matches in IST?",
    answer:
      "England's three group stage matches (vs Croatia, Ghana, Panama) are in Group L. Select IST on Mundial26 and filter by Group L to see all England match times in India.",
  },
  {
    question: "What time is Brazil vs Morocco at the World Cup 2026 in India?",
    answer:
      "Brazil vs Morocco kicks off June 13, 2026 at 6:00 PM ET which is 3:30 AM IST on June 14. Use Mundial26 and filter by Group C for all Brazil matches.",
  },
  {
    question: "What time are Brazil's World Cup 2026 matches in IST?",
    answer:
      "Brazil is in Group C. All three Brazil group stage matches can be found on Mundial26 — filter by Group C and select IST timezone.",
  },
  {
    question: "What time is Argentina vs Algeria at the World Cup 2026 in India?",
    answer:
      "Argentina vs Algeria kicks off June 16, 2026 at 9:00 PM ET which is 6:30 AM IST on June 17. Filter by Group J on Mundial26 for all Argentina matches.",
  },
  {
    question: "What time is France vs Senegal at the World Cup 2026 in India?",
    answer:
      "France vs Senegal kicks off June 16, 2026 at 3:00 PM ET which is 12:30 AM IST on June 17. Filter by Group I on Mundial26 for all France matches.",
  },
  {
    question: "What time is Germany's first World Cup 2026 match in India?",
    answer:
      "Germany vs Curacao kicks off June 14, 2026 at 1:00 PM ET which is 10:30 PM IST on June 14. Filter by Group E on Mundial26 for all Germany matches.",
  },
  {
    question: "What time is Spain vs Cape Verde at the World Cup 2026?",
    answer:
      "Spain vs Cape Verde kicks off June 15, 2026 at 12:00 PM ET which is 9:30 PM IST / 5:00 PM BST / 6:00 PM CET on June 15. Filter by Group H on Mundial26.",
  },
  {
    question: "What time is Portugal vs DR Congo at the World Cup 2026?",
    answer:
      "Portugal vs DR Congo kicks off June 17, 2026 at 1:00 PM ET which is 10:30 PM IST / 6:00 PM BST / 7:00 PM CET on June 17. Filter by Group K on Mundial26.",
  },
  {
    question: "What time is Netherlands vs Japan at the World Cup 2026?",
    answer:
      "Netherlands vs Japan kicks off June 14, 2026 at 4:00 PM ET which is 1:30 AM IST / 9:00 PM BST / 10:00 PM CET on June 14-15. Filter by Group F on Mundial26.",
  },
  {
    question: "What time is Belgium vs Egypt at the World Cup 2026?",
    answer:
      "Belgium vs Egypt kicks off June 15, 2026 at 3:00 PM ET which is 12:30 AM IST / 8:00 PM BST / 9:00 PM CET. Filter by Group G on Mundial26.",
  },
  {
    question: "What time is USA vs Paraguay at the World Cup 2026?",
    answer:
      "USA vs Paraguay kicks off June 12, 2026 at 9:00 PM ET which is 6:30 AM IST / 2:00 AM BST on June 13. Filter by Group D on Mundial26.",
  },
  {
    question: "What time is Mexico vs South Africa at the World Cup 2026?",
    answer:
      "The tournament opener — Mexico vs South Africa kicks off June 11, 2026 at 3:00 PM ET which is 12:30 AM IST / 8:00 PM BST / 9:00 PM CET. Filter by Group A on Mundial26.",
  },
];

const CALENDAR_FAQS: Faq[] = [
  {
    question: "How do I add FIFA World Cup 2026 matches to Google Calendar?",
    answer:
      'Open Mundial26, find any match, and click "Add to Google Calendar". It opens Google Calendar with the match title, time, and venue pre-filled. Click Save. No Mundial26 account needed.',
  },
  {
    question: "How do I add FIFA World Cup 2026 matches to Apple Calendar?",
    answer:
      'On any match card on Mundial26, click "Download .ics". Open the downloaded file and it automatically imports into Apple Calendar on iPhone, iPad, and Mac. Works with iOS and macOS.',
  },
  {
    question: "How do I add FIFA World Cup 2026 matches to Outlook?",
    answer:
      'Click "Download .ics" on any match card on Mundial26. Open the file in Microsoft Outlook and it imports directly into your calendar. Works with Outlook on Windows, Mac, and web.',
  },
  {
    question: "Can I add all World Cup 2026 matches to my calendar at once?",
    answer:
      "Currently Mundial26 supports adding matches one at a time for precision — you add only the matches you actually want to watch. This keeps your calendar clean rather than flooding it with all 72 fixtures.",
  },
  {
    question: "Can I get a printable World Cup 2026 schedule?",
    answer:
      "Switch to Table view on Mundial26 and use your browser's print function (Ctrl+P on Windows, Cmd+P on Mac). All 72 matches are listed in a clean table format ready to print.",
  },
  {
    question: "How do I share World Cup match times on WhatsApp?",
    answer:
      "Every match card has a WhatsApp button. Tap it and a pre-written message with match details and time in IST opens in WhatsApp — ready to send to your group chat instantly.",
  },
];

const GENERAL_FAQS: Faq[] = [
  {
    question: "What is the FIFA World Cup 2026 Final date and time?",
    answer:
      "The Final is July 19, 2026 at MetLife Stadium, New Jersey. Kickoff: 3:00 PM ET / 8:00 PM BST / 9:00 PM CET / 12:30 AM IST (July 20) / 11:00 PM GST (July 19).",
  },
  {
    question: "How many matches are in FIFA World Cup 2026?",
    answer:
      "104 total — 72 group stage matches and 32 knockout round matches. The group stage runs June 11 to June 27. Knockout stage starts June 28 with the Round of 32.",
  },
  {
    question: "When does the FIFA World Cup 2026 group stage end?",
    answer:
      "June 27, 2026. All group stage matches conclude on that date. Knockout stage schedules will be added to Mundial26 after June 27.",
  },
  {
    question: "Which countries are in FIFA World Cup 2026?",
    answer:
      "48 countries across 12 groups (A to L). Notable teams include Brazil, Argentina, France, England, Germany, Spain, Portugal, Netherlands, Belgium, USA, Mexico, Japan, South Korea, Morocco, Senegal and more.",
  },
  {
    question: "Which countries are hosting FIFA World Cup 2026?",
    answer:
      "USA, Canada and Mexico — the first World Cup ever hosted across three countries. The USA hosts 78 of 104 matches. Canada and Mexico host 13 each.",
  },
  {
    question: "Is Mundial26 free?",
    answer:
      "Yes. Completely free. No account, no app download, no signup. Open mundial26.pisharath.dev and start using it immediately.",
  },
  {
    question: "What timezones does Mundial26 support?",
    answer:
      "IST (India), GMT, BST (UK), CET (Europe), ET (US East), PT (US West), CST (US Central), GST (UAE/Gulf), AST (Saudi Arabia), JST (Japan), SGT (Singapore). Select your timezone at the top of the page.",
  },
  {
    question: "Who built Mundial26?",
    answer:
      "Mundial26 was built by Achuth at Switchcompany — a product studio based in Kerala, India. It was built because every available World Cup schedule was in American or European time, leaving Indian and Asian fans doing timezone math at midnight before every match.",
  },
];

const FAQ_GROUPS: { heading: string; faqs: Faq[] }[] = [
  { heading: "Timezone questions", faqs: TIMEZONE_FAQS },
  { heading: "Team-specific questions", faqs: TEAM_FAQS },
  { heading: "Calendar questions", faqs: CALENDAR_FAQS },
  { heading: "General questions", faqs: GENERAL_FAQS },
];

const ALL_FAQS = FAQ_GROUPS.flatMap((group) => group.faqs);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="font-sans text-sm font-normal text-mundial-muted hover:text-foreground hover:underline"
        >
          ← Back to Schedule
        </Link>
        <h1 className="mt-4 font-condensed text-3xl font-bold uppercase tracking-[0.02em] text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h1>

        <div className="mt-8 flex flex-col gap-8">
          {FAQ_GROUPS.map((group) => (
            <section key={group.heading}>
              <h2 className="mb-2 font-condensed text-sm font-semibold uppercase tracking-[0.08em] text-mundial-muted">
                {group.heading}
              </h2>
              <Accordion>
                {group.faqs.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="font-condensed text-base font-medium tracking-[0.01em] text-foreground sm:text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-sm font-normal text-mundial-muted">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
