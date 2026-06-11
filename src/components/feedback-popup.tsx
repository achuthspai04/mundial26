"use client";

import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const SHOWN_KEY = "mundial26_feedback_shown";
const SUBMITTED_KEY = "mundial26_feedback_submitted";
const MOBILE_INACTIVITY_MS = 90_000;

export function FeedbackPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (
      sessionStorage.getItem(SHOWN_KEY) ||
      sessionStorage.getItem(SUBMITTED_KEY)
    ) {
      return;
    }

    const trigger = () => {
      if (
        sessionStorage.getItem(SHOWN_KEY) ||
        sessionStorage.getItem(SUBMITTED_KEY)
      ) {
        return;
      }
      sessionStorage.setItem(SHOWN_KEY, "true");
      setOpen(true);
    };

    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    if (isMobile) {
      let timer: ReturnType<typeof setTimeout>;
      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(trigger, MOBILE_INACTIVITY_MS);
      };
      const activityEvents = ["touchstart", "scroll", "click", "keydown"];
      resetTimer();
      activityEvents.forEach((event) =>
        window.addEventListener(event, resetTimer)
      );
      return () => {
        clearTimeout(timer);
        activityEvents.forEach((event) =>
          window.removeEventListener(event, resetTimer)
        );
      };
    } else {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY < 10) {
          trigger();
        }
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem(SUBMITTED_KEY, "true");
    setSubmitted(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5d8c1529-e647-49aa-b6a3-8709fdf4492a",
          email,
          message,
          subject: "Mundial26 Feedback",
          from_name: "Mundial26",
        }),
      });

      if (response.ok) {
        sendGAEvent("event", "feedback_submitted", {
          has_email: !!email,
          has_message: !!message,
        });
      }
    } catch {
      // Errors are handled silently — always show the thank you state.
    }

    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="bottom-4 top-auto left-1/2 w-[90%] max-w-[420px] -translate-x-1/2 translate-y-0 gap-0 overflow-hidden rounded-2xl p-0 sm:top-1/2 sm:bottom-auto sm:w-full sm:-translate-y-1/2"
      >
        <div className="relative bg-mundial-dark p-5">
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Close"
                className="absolute top-2 right-2 text-white hover:bg-white/10 hover:text-white"
              />
            }
          >
            <XIcon />
          </DialogClose>
          <DialogTitle className="font-condensed text-2xl font-bold text-white">
            Before you go —
          </DialogTitle>
          <p className="mt-2 font-sans text-sm font-normal text-white/80">
            We built Mundial26 so football fans never miss a match because of
            timezone confusion. 30 seconds of feedback helps us make it
            better.
          </p>
        </div>

        {submitted ? (
          <div className="p-5">
            <p className="font-sans text-sm font-normal text-foreground">
              Thanks! We&apos;ll read every response.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
            <Input
              name="email"
              type="email"
              placeholder="your@email.com — optional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 font-sans text-sm font-normal"
            />
            <Textarea
              name="message"
              placeholder="What did you think? What's missing? — optional"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-24 font-sans text-sm font-normal"
            />
            <Button
              type="submit"
              className="h-11 w-full bg-[#2952F5] font-sans text-sm font-normal text-white hover:bg-[#2952F5]/90"
            >
              Send feedback
            </Button>
            <DialogClose
              render={
                <button
                  type="button"
                  className="font-sans text-sm font-normal text-mundial-muted hover:underline"
                />
              }
            >
              No thanks, close
            </DialogClose>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
