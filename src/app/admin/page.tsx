
"use client";

import { useCallback, useEffect, useState } from "react";

type Enquiry = {
  id: number;
  name: string;
  email: string;
  organisation: string | null;
  category: string;
  message: string;
  status: string;
  created_at: string;
};

type Stats = {
  total: number;
  new: number;
  inProgress: number;
  resolved: number;
};

const initialStats: Stats = {
  total: 0,
  new: 0,
  inProgress: 0,
  resolved: 0,
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [filter, setFilter] = useState("All");
const [search, setSearch] = useState("");
const [sortOrder, setSortOrder] = useState("newest");

  const loadEnquiries = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/enquiries", {
        cache: "no-store",
      });

      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load enquiries.");
      }

      setEnquiries(data.enquiries);
      setStats(data.stats);
      setAuthenticated(true);
    } catch {
      setError("Unable to load enquiries. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", {
          cache: "no-store",
        });
        const data = await response.json();

        if (data.authenticated) {
          setAuthenticated(true);
          await loadEnquiries();
        }
      } catch {
        setError("Unable to connect to the admin service.");
      } finally {
        setChecking(false);
      }
    }

    checkSession();
  }, [loadEnquiries]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      setPassword("");
      setAuthenticated(true);
      await loadEnquiries();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to log in."
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    setError("");

    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Update failed.");
      }

      if (selected?.id === id) {
        setSelected({ ...selected, status });
      }

      await loadEnquiries();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update status."
      );
    }
  }

  async function deleteEnquiry(id: number) {
    if (!window.confirm("Delete this enquiry permanently?")) return;

    setError("");

    try {
      const response = await fetch("/api/admin/enquiries", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id }),
});

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Delete failed.");
      }

      setSelected(null);
      await loadEnquiries();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete enquiry."
      );
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setEnquiries([]);
    setStats(initialStats);
    setSelected(null);
  }

 const visibleEnquiries = enquiries
  .filter((item) => {
    const matchesFilter =
      filter === "All" || item.status === filter;

    const searchText = search.toLowerCase();

    const matchesSearch = [
      item.name,
      item.email,
      item.organisation || "",
      item.category,
    ].some((value) =>
      value.toLowerCase().includes(searchText)
    );

    return matchesFilter && matchesSearch;
  })
  .sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();

    return sortOrder === "newest"
      ? dateB - dateA
      : dateA - dateB;
  });

  const cardClass =
    "rounded-2xl border border-gray-800 bg-[#111A29] p-5";

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080D17] text-white">
        Checking admin session...
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080D17] px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-gray-800 bg-[#111A29] p-8">
          <p className="text-xs font-semibold tracking-[0.3em] text-blue-400">
            P TECHNOLOGIES
          </p>

          <h1 className="mt-6 text-3xl font-semibold">
            Admin portal
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Sign in to manage website enquiries.
          </p>

          <form onSubmit={login} className="mt-8 space-y-5">
            <div>
              <label className="text-sm text-gray-300">
                Admin password
              </label>

              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-700 bg-[#080D17] px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-600">
            P Technologies · Local administration
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080D17] text-white">
      <header className="border-b border-gray-800 bg-[#0B1220]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-blue-400">
              P TECHNOLOGIES
            </p>
            <h1 className="mt-1 text-xl font-semibold">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">
              Overview
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Manage and track incoming website enquiries.
            </p>
          </div>

          <button
            onClick={loadEnquiries}
            disabled={loading}
            className="rounded-xl border border-gray-700 px-4 py-2 text-sm hover:bg-gray-800"
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-950 p-4 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total enquiries", stats.total],
            ["New", stats.new],
            ["In progress", stats.inProgress],
            ["Resolved", stats.resolved],
          ].map(([label, value]) => (
            <div key={label} className={cardClass}>
              <p className="text-sm text-gray-400">{label}</p>
              <p className="mt-3 text-3xl font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-4">
  <div className="flex flex-wrap items-center justify-between gap-4">
    <h2 className="text-xl font-semibold">
      Enquiries
    </h2>

    <div className="flex flex-wrap gap-3">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="rounded-xl border border-gray-700 bg-[#111A29] px-4 py-2 text-sm text-white"
      >
        <option value="All">All statuses</option>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="rounded-xl border border-gray-700 bg-[#111A29] px-4 py-2 text-sm text-white"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  </div>

  <input
    type="search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search name, email or organisation..."
    className="w-full rounded-xl border border-gray-700 bg-[#111A29] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
  />
</div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-gray-700 bg-[#111A29] px-4 py-2 text-sm text-white"
            >
              <option>All</option>
              <option>New</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-800">
            {visibleEnquiries.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                No enquiries found.
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {visibleEnquiries.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between gap-5 bg-[#111A29] p-5 md:flex-row md:items-center"
                  >
                    <button
                      onClick={() => setSelected(item)}
                      className="text-left"
                    >
                      <p className="font-semibold hover:text-blue-400">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        {item.email}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {item.category} · {item.created_at}
                      </p>
                    </button>

                    <div className="flex flex-wrap items-center gap-3">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(item.id, e.target.value)
                        }
                        className="rounded-lg border border-gray-700 bg-[#080D17] px-3 py-2 text-sm"
                      >
                        <option>New</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>

                      <button
                        onClick={() => setSelected(item)}
                        className="rounded-lg border border-gray-700 px-3 py-2 text-sm hover:bg-gray-800"
                      >
                        View details
                      </button>

                      <button
                        onClick={() => deleteEnquiry(item.id)}
                        className="rounded-lg border border-red-900 px-3 py-2 text-sm text-red-400 hover:bg-red-950"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <div className="my-8 w-full max-w-2xl rounded-3xl border border-gray-700 bg-[#111A29] p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs tracking-widest text-blue-400">
                  ENQUIRY #{selected.id}
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  {selected.name}
                </h2>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-gray-700 px-3 py-2"
              >
                ✕
              </button>
            </div>

            <div className="mt-7 space-y-4 text-sm">
              <p><span className="text-gray-400">Email:</span> {selected.email}</p>
              <p><span className="text-gray-400">Organisation:</span> {selected.organisation || "Not provided"}</p>
              <p><span className="text-gray-400">Category:</span> {selected.category}</p>
              <p><span className="text-gray-400">Submitted:</span> {selected.created_at}</p>
              <p><span className="text-gray-400">Message:</span></p>
              <p className="whitespace-pre-wrap rounded-xl bg-[#080D17] p-5 leading-7 text-gray-300">
                {selected.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
