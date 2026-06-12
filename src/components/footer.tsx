import Image from "next/image";
import Link from "next/link";
import { SwitchcompanyPopup } from "@/components/switchcompany-popup";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-mundial-blue">
      <div className="mx-auto hidden max-w-5xl items-center justify-between px-6 py-3 sm:flex">
        <div className="flex-1">
          <p className="text-sm text-white/70">
            Crafted by{" "}
            <SwitchcompanyPopup
              trigger="Switchcompany"
              triggerClassName="font-condensed text-lg font-medium text-white hover:underline"
            />
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          <Image
            src="/26_Logo__1_.png"
            alt="Mundial26"
            width={36}
            height={36}
            unoptimized
            className="h-9 w-auto"
          />
          <p className="font-condensed text-[36px] font-bold uppercase tracking-normal text-white">
            #WeAre26
          </p>
        </div>
        <div className="flex flex-1 flex-col items-end gap-0.5 text-right">
          <p className="font-mono text-xs tracking-wide text-white/60">
            mundial26.pisharath.dev
          </p>
          <Link
            href="/faq"
            className="font-sans text-[11px] font-normal text-white/40 hover:underline"
          >
            FAQ
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center sm:hidden">
        <SwitchcompanyPopup
          trigger="Crafted by Switchcompany"
          triggerClassName="flex min-h-11 items-center justify-center font-sans text-sm font-normal text-white/80"
        />
        <Link
          href="/faq"
          className="flex min-h-11 items-center justify-center font-sans text-xs font-normal text-white/40"
        >
          FAQ
        </Link>
      </div>
    </footer>
  );
}
