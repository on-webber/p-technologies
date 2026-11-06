
import SiteHeader from "@/components/SiteHeader";

const products = [
  {
    number: "01",
    name: "PayMesh",
    category: "PAYMENT ORCHESTRATION",
    description:
      "A proposed platform to help businesses organise payment workflows across authorised payment providers.",
    status: "Concept development",
  },
  {
    number: "02",
    name: "ReconX",
    category: "FINANCIAL RECONCILIATION",
    description:
      "Software designed to compare transaction records, identify discrepancies and simplify reconciliation workflows.",
    status: "Concept development",
  },
  {
    number: "03",
    name: "LedgerOS",
    category: "LEDGER INFRASTRUCTURE",
    description:
      "A planned financial record-management platform focused on structured transaction data and reporting.",
    status: "Research stage",
  },
  {
    number: "04",
    name: "RiskGrid",
    category: "RISK INTELLIGENCE",
    description:
      "A proposed analytical platform for financial monitoring, reporting and risk insights.",
    status: "Research stage",
  },
];

export default function FintechPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080D17] text-white">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate">
        <div className="absolute -right-40 top-10 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <p className="text-xs font-semibold tracking-[0.35em] text-blue-400">
            A P TECHNOLOGIES DIVISION
          </p>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.1] tracking-tight md:text-7xl">
            Rethinking the
            <br />
            future of
            <span className="text-blue-400"> financial</span>
            <br />
            infrastructure.
          </h1>

          <p className="mt-9 max-w-2xl text-lg leading-8 text-gray-400">
            P Fintech is an emerging financial technology initiative
            exploring software for payment workflows, financial
            operations, ledger systems and intelligent financial tools.
          </p>

          <div className="mt-11 flex flex-wrap gap-4">
            <a
              href="#products"
              className="rounded-full bg-blue-600 px-7 py-3.5 text-sm font-medium hover:bg-blue-500"
            >
              Explore our vision ↗
            </a>
            <a
              href="/contact"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm hover:bg-white/10"
            >
              Partnership enquiries
            </a>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="bg-[#F4F6FA] py-24 text-[#101827]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-blue-600">
              OUR DIRECTION
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Financial technology should make complexity simpler.
            </h2>
          </div>

          <div className="self-end">
            <p className="text-lg leading-8 text-gray-600">
              Modern businesses work with increasingly complex financial
              systems. Our long-term vision is to explore software that
              improves visibility, organisation and efficiency across
              financial operations.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT CONCEPTS */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-28">
        <p className="text-xs font-semibold tracking-[0.3em] text-blue-400">
          PRODUCT EXPLORATION
        </p>

        <h2 className="mt-6 max-w-3xl text-4xl font-semibold md:text-5xl">
          Building towards a connected financial ecosystem.
        </h2>

        <p className="mt-6 max-w-2xl leading-8 text-gray-400">
          These are proposed product concepts under exploration.
          They are not currently offered as live financial services.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.number}
              className="rounded-2xl border border-white/10 bg-[#101827] p-8 transition hover:border-blue-500/50 md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-400">
                  {product.number}
                </span>
                <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[10px] text-blue-300">
                  {product.status}
                </span>
              </div>

              <p className="mt-14 text-[10px] font-semibold tracking-[0.2em] text-gray-500">
                {product.category}
              </p>

              <h3 className="mt-3 text-3xl font-semibold">
                {product.name}
              </h3>

              <p className="mt-5 leading-7 text-gray-400">
                {product.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section className="bg-white py-24 text-[#101827]">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-blue-600">
            OUR PRINCIPLES
          </p>

          <h2 className="mt-6 max-w-3xl text-4xl font-semibold md:text-5xl">
            Designed around trust and reliability.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              ["Security", "Security-conscious software design and responsible data handling."],
              ["Transparency", "Clear financial records, reporting and operational visibility."],
              ["Interoperability", "Exploring integrations with authorised financial service providers."],
            ].map(([title, description], index) => (
              <article key={title} className="border-t border-gray-200 pt-7">
                <p className="text-sm text-blue-600">0{index + 1}</p>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-4 leading-7 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="border-y border-white/10 bg-[#101827] py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold tracking-widest text-gray-300">
            IMPORTANT INFORMATION
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-400">
            P Fintech is a proposed business division. The products and
            capabilities described on this page are exploratory concepts
            and are not represented as currently available services.
            Any future regulated financial activities would require
            appropriate authorisations and partnerships.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-28 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-blue-400">
          CONNECT WITH US
        </p>
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold md:text-5xl">
          Let's shape the next generation of financial technology.
        </h2>
        <a
          href="/contact"
          className="mt-10 inline-flex rounded-full bg-blue-600 px-8 py-4 text-sm font-medium hover:bg-blue-500"
        >
          Contact P Fintech ↗
        </a>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-gray-500">
        © 2026 P Technologies · P Fintech Division
      </footer>
    </main>
  );
}
