import SiteHeader from "./SiteHeader";
type Section = {
  heading: string;
  description: string;
};

type InnerPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Section[];
};

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Businesses", "/businesses"],
  ["P Fintech", "/fintech"],
  ["Technology", "/technology"],
  ["Investors", "/investors"],
  ["Contact", "/contact"],
];

export default function InnerPage({
  eyebrow,
  title,
  description,
  sections,
}: InnerPageProps) {
  return (
    <main className="min-h-screen bg-[#080D17] text-white">
     <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-28">
        <p className="text-xs font-semibold tracking-[0.3em] text-blue-400">
          {eyebrow}
        </p>
        <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          {title}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          {description}
        </p>
      </section>

      <section className="bg-white py-20 text-[#101827]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          {sections.map((section, index) => (
            <article
              key={section.heading}
              className="rounded-2xl border border-gray-200 p-8"
            >
              <p className="text-sm text-blue-600">
                0{index + 1}
              </p>
              <h2 className="mt-5 text-2xl font-semibold">
                {section.heading}
              </h2>
              <p className="mt-4 leading-7 text-gray-600">
                {section.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-9 text-sm text-gray-500">
        <p>© 2026 P Technologies. All rights reserved.</p>
        <a href="/contact" className="hover:text-white">
          Contact us ↗
        </a>
      </footer>
    </main>
  );
}
