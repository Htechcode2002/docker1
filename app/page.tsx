"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        fetchUsers();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchUsers();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-200 px-4 py-12 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
            User Universe
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Manage your users with elegance and precision.123123
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Form Side */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 rounded-3xl border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/70">
              <h2 className="mb-6 text-xl font-bold text-slate-800 dark:text-slate-100">Register New User</h2>
              <form onSubmit={addUser} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="mt-1 block w-full rounded-xl border-none bg-slate-100 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="mt-1 block w-full rounded-xl border-none bg-slate-100 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
                >
                  <span className="relative z-10">{loading ? "Processing..." : "Add User"}</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </form>
            </div>
          </aside>

          {/* List Side */}
          <main className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/50 shadow-xl backdrop-blur-md dark:bg-slate-900/50">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-bold">Active Users</h2>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {users.length} Total
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                      <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">User Details</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {users.map((user) => (
                      <tr key={user.id} className="group transition-colors hover:bg-white/40 dark:hover:bg-slate-800/40">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 dark:text-slate-200">{user.name}</div>
                              <div className="text-xs text-slate-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="rounded-lg px-3 py-1.5 text-xs font-bold text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-900/20"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={2} className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="text-4xl">🌑</div>
                            <p className="font-medium text-slate-400">No users in the galaxy yet.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
