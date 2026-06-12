"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const VALUE_PROPS = [
  "Got an idea that needs to exist on the internet",
  "Got a problem your team solves manually every day",
  "Got a product that needs to move faster",
];

interface SwitchcompanyPopupProps {
  trigger: React.ReactNode;
  triggerClassName?: string;
}

export function SwitchcompanyPopup({
  trigger,
  triggerClassName,
}: SwitchcompanyPopupProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5d8c1529-e647-49aa-b6a3-8709fdf4492a",
          email,
          message,
          subject: "Switchcompany Lead — Mundial26",
          from_name: "Mundial26 Footer",
        }),
      });
    } catch {
      // Errors are handled silently — always show success.
    }

    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<button type="button" className={triggerClassName} />}
      >
        {trigger}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "bottom-0 top-auto left-1/2 w-[92%] max-w-[440px] -translate-x-1/2 translate-y-0 gap-0 overflow-hidden rounded-t-2xl rounded-b-none bg-[#0F1729] p-0 ring-1 ring-white/10",
          "data-open:slide-in-from-bottom-10 data-closed:slide-out-to-bottom-10",
          "sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:rounded-2xl",
          "sm:data-open:slide-in-from-bottom-0 sm:data-open:zoom-in-95 sm:data-closed:slide-out-to-bottom-0 sm:data-closed:zoom-out-95"
        )}
      >
        <div className="relative bg-[#0A1128] p-5">
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
          <DialogTitle className="font-condensed text-3xl font-bold text-white">
            Switchcompany
          </DialogTitle>
          <p className="mt-2 font-sans text-sm font-normal text-white/60">
            We build digital products — for you, and for ourselves.
          </p>
        </div>

        {submitted ? (
          <div className="p-5">
            <p className="font-sans text-sm font-normal text-white">
              We got it. Talk soon. 🤝
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-5">
            <div className="border-t border-white/10" />

            <div className="flex flex-col gap-2">
              {VALUE_PROPS.map((line) => (
                <p
                  key={line}
                  className="font-sans text-sm font-medium text-white"
                >
                  <span className="text-white/40">→</span> {line}
                </p>
              ))}
            </div>

            <div className="border-t border-white/10" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full border-white/15 bg-white/5 font-sans text-sm font-normal text-white placeholder:text-white/40"
                />
                <p className="mt-1 font-sans text-xs font-normal text-white/40">
                  Optional
                </p>
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="What do you want to build?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-24 w-full border-white/15 bg-white/5 font-sans text-sm font-normal text-white placeholder:text-white/40"
                />
                <p className="mt-1 font-sans text-xs font-normal text-white/40">
                  Optional
                </p>
              </div>
              <Button
                type="submit"
                className="h-11 w-full bg-mundial-blue font-condensed text-base font-medium text-white hover:bg-mundial-blue/90"
              >
                Let&apos;s talk
              </Button>
              <p className="text-center font-sans text-xs font-normal text-white/40">
                We&apos;ll reply within 24 hours.
              </p>
              <DialogClose
                render={
                  <button
                    type="button"
                    className="font-sans text-sm font-normal text-white/50 hover:underline"
                  />
                }
              >
                maybe later
              </DialogClose>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
