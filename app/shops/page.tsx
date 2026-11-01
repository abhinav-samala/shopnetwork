"use client";

import Link from "next/link";
import { useState } from "react";

type Shop = {
  id: number;
  name: string;
  category: string;
  address: string;
  hours: string;
  icon: string;
  description: string;
  phone: string;
};

const shops: Shop[] = [
  {
    id: 1,
    name: "Sri Lakshmi General Store",
    category: "Groceries",
    address: "Hanamkonda, Warangal",
    hours: "9:00 AM – 9:00 PM",
    icon: "🛒",
    description: "Everyday groceries and household essentials.",
    phone: "Phone number not provided",
  },
  {
    id: 2,
    name: "Fresh Basket",
    category: "Vegetables",
    address: "Warangal",
    hours: "6:00 AM – 8:00 PM",
    icon: "🥦",
    description: "Fresh vegetables and seasonal produce.",
    phone: "Phone number not provided",
  },
  {
    id: 3,
    name: "Daily Milk Corner",
    category: "Milk & Dairy",
    address: "Kazipet, Warangal",
    hours: "6:00 AM – 9:00 PM",
    icon: "🥛",
    description: "Milk, curd, butter and other dairy products.",
    phone: "Phone number not provided",
  },
  {
    id: 4,
    name: "Family Snacks Shop",
    category: "Snacks",
    address: "Warangal",
    hours: "10:00 AM – 10:00 PM",
    icon: "🍪",
    description: "Snacks, biscuits and packaged foods.",
    phone: "Phone number not provided",
  },
];

export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(search.toLowerCase()) ||
      shop.category.toLowerCase().includes(search.toLowerCase()) ||
      shop.address.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || shop.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#FFFDF7] text-gray-800">
      <header className="flex items-center justify-between bg-white px-6 py-5 shadow-sm">
        <Link href="/" className="text-2xl font-extrabold text-green-700">
          🛍️ ShopNetwork
        </Link>

        <Link
          href="/"
          className="rounded-xl border border-green-700 px-4 py-2 font-semibold text-green-800 hover:bg-green-50"
        >
          ← Home
        </Link>
      </header>

      <section className="bg-green-800 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold text-green-100">
            BUY • SELL • CONNECT
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Find Nearby Shops 📍
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-green-50">
            Discover local stores, explore shop categories and support
            businesses in your neighbourhood.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <label
            htmlFor="shop-search"
            className="mb-2 block font-bold"
          >
            Search shops or locations
          </label>

          <input
            id="shop-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try groceries, vegetables or Warangal..."
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-green-600"
          />

          <label
            htmlFor="shop-category"
            className="mb-2 mt-5 block font-bold"
          >
            Shop category
          </label>

          <select
            id="shop-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-4"
          >
            <option value="All">All Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Milk & Dairy">Milk & Dairy</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>

        <div className="mb-6 mt-10 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-extrabold">Local Shops</h2>

          <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-800">
            {filteredShops.length} shops found
          </span>
        </div>

        {filteredShops.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredShops.map((shop) => (
              <article
                key={shop.id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-green-100 p-4 text-4xl">
                    {shop.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold">
                      {shop.name}
                    </h3>

                    <p className="mt-1 font-semibold text-green-700">
                      {shop.category}
                    </p>
                  </div>
                </div>

                <p className="mt-5 leading-7 text-gray-600">
                  {shop.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>📍 {shop.address}</p>
                  <p>🕒 {shop.hours}</p>
                </div>

                <div className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                  Demo listing — shop details have not been verified.
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {shop.phone}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-5xl">🔎</p>

            <h3 className="mt-4 text-xl font-bold">
              No matching shops found
            </h3>

            <p className="mt-2 text-gray-600">
              Try another shop name, location or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
            >
              Show All Shops
            </button>
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-green-100 p-6 text-center">
          <h2 className="text-xl font-extrabold">
            Discover more with ShopNetwork
          </h2>

          <p className="mt-2 text-gray-700">
            Looking for a particular product?
          </p>

          <Link
            href="/products"
            className="mt-5 inline-block rounded-xl bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800"
          >
            Explore Products →
          </Link>
        </div>
      </section>

      <footer className="bg-green-950 px-6 py-6 text-center text-white">
        <h2 className="font-extrabold">ShopNetwork</h2>
        <p className="mt-2 text-sm">BUY • SELL • CONNECT</p>
        <p className="mt-2 text-sm text-green-100">
          © 2026 ShopNetwork
        </p>
      </footer>
    </main>
  );
}