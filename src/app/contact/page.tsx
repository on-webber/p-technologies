
"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    category: "General enquiry",
    message: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  function updateField(
    field: string,
    value: string | boolean
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setFeedback("");

    if (!form.consent) {
      setFeedback("Please accept the privacy consent before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organisation: form.organisation,
          category: form.category,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setFeedback("Thank you! Your enquiry has been submitted successfully.");

      setForm({
        name: "",
        email: "",
        organisation: "",
        category: "General enquiry",
        message: "",
        consent: false,
      });
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-[#080D17] text-white">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-28">
        <p className="text-xs font-semibold tracking-[0.3em] text-blue-400">
          CONTACT
        </p>

        <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          Let's start a conversation.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
          Have a question, a business proposal or a technology idea?
          We'd be glad to hear from you.
        </p>
      </section>

      <section className="bg-white py-20 text-[#101827]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr]">

          <div>
            <p className="text-sm font-semibold tracking-widest text-blue-600">
              GET IN TOUCH
            </p>

            <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
              Tell us what you're looking for.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Whether you're exploring a partnership, learning about our
              technology initiatives or making a general enquiry, use the
              form to contact P Technologies.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="font-semibold">General Enquiries</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Questions and information about P Technologies.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Business Partnerships</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Potential collaborations and business opportunities.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Technology Partnerships</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Technology discussions, integrations and innovation.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50 md:p-10">
            <h2 className="text-2xl font-semibold">
              Send an enquiry
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Fields marked with * are required.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">
                    Full name *
                  </label>
                  <input
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Email address *
                  </label>
                  <input
                    required
                    type="email"
                    maxLength={254}
                    value={form.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Organisation
                </label>
                <input
                  maxLength={150}
                  value={form.organisation}
                  onChange={(e) =>
                    updateField("organisation", e.target.value)
                  }
                  placeholder="Company or organisation name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Enquiry type *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value)
                  }
                  className={inputClass}
                >
                  <option>General enquiry</option>
                  <option>Business partnership</option>
                  <option>Technology partnership</option>
                  <option>Investor enquiry</option>
                  <option>Developer enquiry</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Your message *
                </label>
                <textarea
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    updateField("message", e.target.value)
                  }
                  placeholder="Tell us a little about your enquiry..."
                  className={inputClass + " resize-y"}
                />
              </div>

              <label className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) =>
                    updateField("consent", e.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-blue-600"
                />
                <span>
                  I agree that my information may be used to respond
                  to this enquiry.
                </span>
              </label>

              {feedback && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800"
                >
                  {feedback}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#101827] px-6 py-4 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit enquiry →"}
              </button>
            </form>
          </div>

        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-9 text-sm text-gray-500">
        <p>© 2026 P Technologies. All rights reserved.</p>
        <a href="/" className="hover:text-white">
          Back to home →
        </a>
      </footer>
    </main>
  );
}
