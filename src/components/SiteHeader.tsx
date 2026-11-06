
"use client";

import { useState } from "react";
import BrandLogo from "./BrandLogo";

const links = [
  { name: "About", href: "/about" },
  { name: "Businesses", href: "/businesses" },
  { name: "P Fintech", href: "/fintech" },
  { name: "Technology", href: "/technology" },
  { name: "Investors", href: "/investors" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080D17]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <BrandLogo />

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 transition hover:text-blue-400"
            >
              {link.name}
            </a>
          ))}
        </div>

        <a
          href="/contact"
          className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium transition hover:bg-blue-500 lg:block"
        >
          Get in touch ↗
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="rounded-lg border border-white/20 px-3 py-2 text-sm lg:hidden"
        >
          {menuOpen ? "Close ✕" : "Menu ☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#080D17] px-6 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-blue-400"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-blue-400"
            >
              Get in touch ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
