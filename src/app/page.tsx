
import SiteHeader from "@/components/SiteHeader";
import BrandLogo from "@/components/BrandLogo";

const divisions = [
  {
    number: "01",
    name: "P Fintech",
    category: "FINANCIAL TECHNOLOGY",
    description:
      "Exploring modern payment infrastructure, financial software and intelligent financial operations.",
    href: "/fintech",
    symbol: "↗",
  },
  {
    number: "02",
    name: "P Technologies",
    category: "TECHNOLOGY & INNOVATION",
    description:
      "Creating digital products, intelligent platforms and technology-driven solutions.",
    href: "/technology",
    symbol: "⌘",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Financial Technology",
    description:
      "Payment infrastructure, financial workflows and modern financial software.",
  },
  {
    number: "02",
    title: "Software Engineering",
    description:
      "Thoughtful software architecture, digital platforms and scalable applications.",
  },
  {
    number: "03",
    title: "Digital Innovation",
    description:
      "Exploring emerging technologies and turning ideas into useful digital experiences.",
  },
  {
    number: "04",
    title: "Intelligent Systems",
    description:
      "Technology-led automation, analytics and smarter operational workflows.",
  },
];

const principles = [
  {
    number: "01",
    title: "Think long term",
    description:
      "Build with a long-term perspective, not just for immediate outcomes.",
  },
  {
    number: "02",
    title: "Engineering matters",
    description:
      "Strong foundations, thoughtful architecture and reliable technology.",
  },
  {
    number: "03",
    title: "Progress with purpose",
    description:
      "Focus on meaningful problems and create solutions with real utility.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#080D17] text-white">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate min-h-[760px] overflow-hidden">
        <div className="pointer-events-none absolute -right-48 top-0 -z-10 h-[650px] w-[650px] rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-[130px]" />

        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-9 inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-[10px] font-semibold tracking-[0.22em] text-blue-300">
                AN INDEPENDENT TECHNOLOGY VENTURE
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[76px]">
              Technology for
              <br />
              <span className="text-blue-400">what comes next.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
              P Technologies is an emerging technology venture focused on
              exploring digital products, financial technology and intelligent
              software platforms.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/businesses"
                className="rounded-full bg-blue-600 px-7 py-4 text-sm font-semibold transition hover:bg-blue-500"
              >
                Explore our divisions <span className="ml-2">↗</span>
              </a>

              <a
                href="/about"
                className="rounded-full border border-white/20 px-7 py-4 text-sm font-medium transition hover:border-white/50 hover:bg-white/5"
              >
                Discover P Technologies
              </a>
            </div>

            <div className="mt-16 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7">
              {["TECHNOLOGY", "FINTECH", "SOFTWARE", "INNOVATION"].map(
                (item) => (
                  <span
                    key={item}
                    className="text-[10px] font-semibold tracking-[0.2em] text-gray-500"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          {/* ABSTRACT TECHNOLOGY VISUAL */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-blue-400/10" />
            <div className="absolute inset-12 rounded-full border border-blue-400/15" />
            <div className="absolute inset-20 rounded-full border border-blue-400/20" />

            <div className="absolute h-64 w-64 rounded-full bg-blue-600/20 blur-[80px]" />

            <div className="relative flex h-44 w-44 items-center justify-center rounded-[42px] border border-blue-300/30 bg-gradient-to-br from-blue-500/30 to-indigo-950/80 shadow-[0_0_100px_rgba(37,99,235,0.2)]">
              <span className="text-8xl font-semibold tracking-tighter text-white">
                P
              </span>
            </div>

            <div className="absolute right-0 top-[20%] rounded-2xl border border-white/10 bg-[#111A29]/90 px-5 py-4 shadow-xl backdrop-blur-xl">
              <p className="text-[9px] tracking-[0.2em] text-gray-500">
                DIVISION 01
              </p>
              <p className="mt-2 text-sm font-semibold">P Fintech</p>
              <p className="mt-1 text-[10px] text-blue-400">
                Financial technology
              </p>
            </div>

            <div className="absolute bottom-[16%] left-0 rounded-2xl border border-white/10 bg-[#111A29]/90 px-5 py-4 shadow-xl backdrop-blur-xl">
              <p className="text-[9px] tracking-[0.2em] text-gray-500">
                DIVISION 02
              </p>
              <p className="mt-2 text-sm font-semibold">P Technologies</p>
              <p className="mt-1 text-[10px] text-blue-400">
                Digital innovation
              </p>
            </div>

            <div className="absolute bottom-2 right-[20%] h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_25px_#60A5FA]" />
            <div className="absolute left-[20%] top-2 h-2 w-2 rounded-full bg-indigo-400" />
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="bg-[#F4F6FA] py-28 text-[#101827]">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-blue-700">
              ABOUT THE COMPANY
            </p>

            <h2 className="mt-7 text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
              One vision.
              <br />
              Multiple possibilities.
            </h2>
          </div>

          <div className="self-end">
            <p className="text-lg leading-9 text-gray-600">
              We see technology as an opportunity to solve meaningful
              problems and build useful products. Our focus spans software
              engineering, financial technology and digital innovation.
            </p>

            <a
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-500"
            >
              Learn about our vision <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section id="businesses" className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-blue-400">
              OUR BUSINESS STRUCTURE
            </p>

            <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
              Focused divisions.
              <br />
              Shared ambition.
            </h2>
          </div>

          <a
            href="/businesses"
            className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
          >
            Explore all divisions ↗
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {divisions.map((division) => (
            <a
              key={division.number}
              href={division.href}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#101827] p-8 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-[#142238] md:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-600/10 blur-[80px] transition group-hover:bg-blue-500/20" />

              <div className="relative flex items-center justify-between">
                <span className="text-sm font-medium text-blue-400">
                  {division.number}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-xl text-gray-400 transition group-hover:border-blue-400/40 group-hover:text-blue-400">
                  {division.symbol}
                </span>
              </div>

              <div className="relative mt-20">
                <p className="text-[10px] font-semibold tracking-[0.22em] text-gray-500">
                  {division.category}
                </p>

                <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                  {division.name}
                </h3>

                <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
                  {division.description}
                </p>

                <p className="mt-10 text-sm font-semibold text-blue-400">
                  Explore division <span className="ml-2">↗</span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-white py-28 text-[#101827]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-blue-700">
              AREAS OF FOCUS
            </p>

            <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Exploring technology across disciplines.
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-gray-500">
              Our interests span the foundations of modern software and
              financial systems, with an emphasis on useful products and
              thoughtful engineering.
            </p>
          </div>

          <div className="mt-16 grid gap-x-12 md:grid-cols-2">
            {capabilities.map((item) => (
              <article
                key={item.number}
                className="border-t border-gray-200 py-9"
              >
                <span className="text-xs font-semibold text-blue-700">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-[#EEF2F8] py-28 text-[#101827]">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-700">
            OUR PHILOSOPHY
          </p>

          <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
            Building with clarity and purpose.
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.number}
                className="border-t border-gray-300 pt-7"
              >
                <p className="text-sm font-semibold text-blue-700">
                  {item.number}
                </p>

                <h3 className="mt-8 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative isolate overflow-hidden px-6 py-32">
        <div className="pointer-events-none absolute -right-20 top-0 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />

        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-400">
            CONNECT WITH US
          </p>

          <h2 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            The next idea could start here.
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-gray-400">
            Have an idea, a business enquiry or an opportunity to collaborate?
            We'd be interested in hearing from you.
          </p>

          <a
            href="/contact"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#101827] transition hover:bg-blue-100"
          >
            Start a conversation ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-14 md:flex-row md:items-center">
          <div>
            <BrandLogo />
            <p className="mt-4 text-sm text-gray-500">
              Technology for what comes next.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-4 text-sm text-gray-400">
            <a href="/about" className="transition hover:text-white">About</a>
            <a href="/businesses" className="transition hover:text-white">Businesses</a>
            <a href="/fintech" className="transition hover:text-white">P Fintech</a>
            <a href="/technology" className="transition hover:text-white">Technology</a>
            <a href="/investors" className="transition hover:text-white">Investors</a>
            <a href="/contact" className="transition hover:text-white">Contact</a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 px-6 py-6 text-xs text-gray-500 sm:flex-row">
          <p>© 2026 P Technologies. All rights reserved.</p>
          <p>Built with a long-term vision.</p>
        </div>
      </footer>
    </main>
  );
}
