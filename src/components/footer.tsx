import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-mundial-blue p-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
        <p className="text-base text-white/70">
          Crafted by{" "}
          <a
            href="https://switchcompany.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-condensed text-xl font-medium text-white hover:underline"
          >
            Switchcompany
          </a>
          {" · "}
          <Link href="/faq" className="text-white hover:underline">
            FAQ
          </Link>
        </p>
        <div className="flex items-center gap-2">
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
        <p className="font-mono text-xs tracking-wide text-white/60">
          mundial26.pisharath.dev
        </p>
      </div>
    </footer>
  );
}
