"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  "🛒 Groceries",
  "🥦 Vegetables",
  "🥛 Milk & Dairy",
  "🍪 Snacks",
  "🧴 Personal Care",
  "🧹 Household",
];

export default function CustomerPage() {
  const [search, setSearch] = useState("");

  function searchProducts(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();

    if (query.length > 0) {
      window.location.href =
        "/products?search=" + encodeURIComponent(query);
    } else {
      window.location.href = "/products";
    }
  }

  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-800">
      <header className="border-b bg-white p-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-green-800">
            🛍️ ShopNetwork
          </Link>

          <nav className="flex gap-3">
            <Link href="/" className="rounded-lg p-2">
              Home
            </Link>

            <Link
              href="/shops"
              className="rounded-lg bg-green-700 px-4 py-2 text-white"
            >
              Find Shops
            </Link>

            <Link
              href="/products"
              className="rounded-lg border border-green-700 px-4 py-2 text-green-800"
            >
              Products
            </Link>
          </nav>
        </div>
      </header>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="font-semibold text-green-700">
              💚 Shop Local, Support Local
            </p>

            <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">
              Everything you need,
              <span className="text-green-700"> close to home.</span>
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              Discover everyday products and local shops in Warangal and
              nearby areas with ShopNetwork.
            </p>

            <form
              onSubmit={searchProducts}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search rice, milk, vegetables..."
                className="min-w-0 flex-1 rounded-xl border p-4"
              />

              <button
                type="submit"
                className="rounded-xl bg-green-700 px-6 py-4 font-bold text-white"
              >
                🔍 Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shops"
                className="rounded-xl bg-green-700 px-5 py-3 font-bold text-white"
              >
                📍 Find Nearby Shops →
              </Link>

              <Link
                href="/products"
                className="rounded-xl border-2 border-green-700 px-5 py-3 font-bold text-green-800"
              >
                🛍️ Explore Products →
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-green-100 p-8">
            <div className="rounded-2xl bg-white p-8">
              <div className="text-6xl">🛍️</div>

              <h2 className="mt-5 text-2xl font-bold text-green-900">
                Your Local Shopping Companion
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Explore local shops, browse everyday products, and support
                businesses in your community.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-4">
                <p className="text-3xl">🏪</p>
                <p className="mt-2 font-bold">Local Shops</p>
              </div>

              <div className="rounded-xl bg-white p-4">
                <p className="text-3xl">🧺</p>
                <p className="mt-2 font-bold">Daily Needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-extrabold">
            Explore Categories
          </h2>

          <p className="mt-3 text-center text-slate-600">
            Find the products you need for everyday life.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={"/products?category=" + encodeURIComponent(category)}
                className="rounded-2xl border p-6 font-bold transition hover:border-green-500 hover:bg-green-50"
              >
                <span className="text-xl">{category}</span>
                <p className="mt-4 text-green-700">Browse Products →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-800 p-10 text-center text-white">
          <h2 className="text-3xl font-extrabold">
            Discover Shops Near You
          </h2>

          <p className="mt-4">
            Explore local businesses through ShopNetwork.
          </p>

          <Link
            href="/shops"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-bold text-green-800"
          >
            Find Nearby Shops →
          </Link>
        </div>
      </section>

      <footer className="border-t bg-white p-6 text-center text-slate-600">
        <p>© 2026 ShopNetwork. Supporting local communities.</p>

        <Link href="/" className="mt-3 inline-block text-green-800">
          ← Back to Home
        </Link>
      </footer>
    </main>
  );
}