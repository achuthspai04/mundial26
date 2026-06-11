import Image from "next/image";

export function Hero() {
  return (
    <header className="bg-mundial-blue px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex w-full flex-row items-center gap-3 px-4 sm:hidden sm:flex-col sm:items-center">
        <Image
          src="/26_Logo__1_.png"
          alt="Mundial26"
          width={56}
          height={56}
          unoptimized
          className="h-14 w-auto flex-shrink-0"
          priority
        />
        <h1 className="text-left font-condensed text-xl font-bold tracking-[0.04em] uppercase text-white">
          Every match. Your timezone.
          <br />
          Your calendar.
        </h1>
      </div>
      <div className="mx-auto hidden max-w-5xl sm:flex sm:flex-row sm:items-center sm:gap-8">
        <Image
          src="/Orientation_Horizontal__Colour_White.png"
          alt="FIFA World Cup 2026"
          width={159}
          height={60}
          unoptimized
          className="hidden h-[60px] w-auto sm:block"
          priority
        />
        <h1 className="text-center font-condensed text-2xl font-bold tracking-[0.04em] uppercase text-white sm:text-left sm:text-4xl md:text-5xl">
          Every match. Your timezone. Your calendar.
        </h1>
      </div>
    </header>
  );
}
