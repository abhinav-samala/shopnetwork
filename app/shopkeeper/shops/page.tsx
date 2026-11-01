"use client";

import Link from "next/link";
import { useState } from "react";

const shops = [
  {
    name: "Sri Lakshmi General Store",
    category: "Groceries & Daily Needs",
    location: "Hanamkonda, Warangal",
    phone: "Contact shop for details",
    icon: "🏪",
    status: "Daily essentials",
  },
  {
    name: "Fresh Basket",
    category: "Fruits & Vegetables",
    location: "Warangal",
    phone: "Contact shop for details",
    icon: "🥦",
    status: "Fresh produce",
  },
  {
    name: "Milk Point",
    category: "Milk & Dairy",
    location: "Hanamkonda, Warangal",
    phone: "Contact shop for details",
    icon: "🥛",
    status: "Dairy products",
  },
  {
    name: "Smart Snacks Corner",
    category: "Snacks & Beverages",
    location: "Warangal",
    phone: "Contact shop for details",
    icon: "🍪",
    status: "Snacks and drinks",
  },
  {
    name: "City Home Needs",
    category: "Household & Personal Care",
    location: "Warangal",
    phone: "Contact shop for details",
    icon: "🧴",
    status: "Everyday essentials",
  },
  {
    name: "Daily Needs Store",
    category: "General Store",
    location: "Kazipet, Warangal",
    phone: "Contact shop for details",
    icon: "🛒",
    status: "Everyday shopping",
  },
];

export default function NearbyShopsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Groceries & Daily Needs",
    "Fruits & Vegetables",
    "Milk & Dairy",
    "Snacks & Beverages",
    "Household & Personal Care",
    "General Store",
  ];

  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      `${shop.name} ${shop.category} ${shop.location}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());

    const matchesCategory =
      category === "All" || shop.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-4 py-6 text-gray-800 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-bold text-green-800 hover:underline">
            ← ShopNetwork Home
          </Link>

          <Link
            href="/products"
            className="rounded-xl bg-green-700 px-4 py-3 font-bold text-white hover:bg-green-800"
          >
            Explore Products →
          </Link>
        </header>

        <section className="mt-8 rounded-3xl bg-green-800 p-7 text-white sm:p-10">
          <p className="font-bold tracking-widest text-green-200">
            BUY • SELL • CONNECT
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            Find Nearby Shops 🏪
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-green-100">
            Discover local stores, explore shopping categories, and support
            businesses in your community.
          </p>

          <div className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search shops, products or locations..."
              aria-label="Search shops"
              className="min-w-0 flex-1 rounded-xl bg-white px-4 py-4 text-gray-800 outline-none focus:ring-4 focus:ring-green-300"
            />

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="rounded-xl bg-white px-5 py-4 font-bold text-green-800 hover:bg-green-50"
            >
              Reset
            </button>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">Explore Shop Categories</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-3 font-semibold ${
                  category === item
                    ? "bg-green-700 text-white"
                    : "border border-green-200 bg-white text-green-800 hover:bg-green-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black">Shops in Your Community</h2>

            <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-800">
              {filteredShops.length} shops
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            Demonstration listings for the ShopNetwork website.
          </p>

          {filteredShops.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="text-4xl">🔎</p>
              <h3 className="mt-3 text-xl font-bold">No shops found</h3>
              <p className="mt-2 text-gray-600">
                Try another shop name, location, or category.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredShops.map((shop) => (
                <article
                  key={shop.name}
                  className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl">
                    {shop.icon}
                  </div>

                  <h3 className="mt-4 text-xl font-extrabold">{shop.name}</h3>

                  <p className="mt-2 font-semibold text-green-800">
                    {shop.category}
                  </p>

                  <p className="mt-3 text-gray-600">
                    📍 {shop.location}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">{shop.status}</p>

                  <div className="mt-5 rounded-xl bg-green-50 p-3 text-sm text-green-900">
                    ℹ️ Sample listing — real shop contact details are not
                    connected yet.
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-green-100 py-6 text-center text-sm text-gray-500">
          ShopNetwork • BUY • SELL • CONNECT
        </footer>
      </div>
    </main>
  );
}