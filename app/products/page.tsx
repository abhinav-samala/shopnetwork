"use client";

import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Rice",
    category: "Groceries",
    price: 60,
    unit: "per kg",
    icon: "🍚",
    description: "An everyday kitchen essential.",
  },
  {
    id: 2,
    name: "Fresh Milk",
    category: "Milk & Dairy",
    price: 30,
    unit: "per 500 ml",
    icon: "🥛",
    description: "A daily dairy essential.",
  },
  {
    id: 3,
    name: "Tomatoes",
    category: "Vegetables",
    price: 40,
    unit: "per kg",
    icon: "🍅",
    description: "A versatile cooking ingredient.",
  },
  {
    id: 4,
    name: "Potatoes",
    category: "Vegetables",
    price: 35,
    unit: "per kg",
    icon: "🥔",
    description: "A staple for everyday meals.",
  },
  {
    id: 5,
    name: "Biscuits",
    category: "Snacks",
    price: 20,
    unit: "per pack",
    icon: "🍪",
    description: "A snack for tea time.",
  },
  {
    id: 6,
    name: "Cooking Oil",
    category: "Groceries",
    price: 150,
    unit: "per litre",
    icon: "🫗",
    description: "An essential cooking ingredient.",
  },
  {
    id: 7,
    name: "Bath Soap",
    category: "Personal Care",
    price: 35,
    unit: "per bar",
    icon: "🧼",
    description: "An everyday personal care product.",
  },
  {
    id: 8,
    name: "Orange Juice",
    category: "Beverages",
    price: 40,
    unit: "per bottle",
    icon: "🧃",
    description: "A refreshing drink.",
  },
];

export default function ExploreProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Groceries",
    "Vegetables",
    "Milk & Dairy",
    "Snacks",
    "Personal Care",
    "Beverages",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());

    const matchesCategory =
      category === "All" || product.category === category;

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
            href="/shops"
            className="rounded-xl bg-green-700 px-4 py-3 font-bold text-white hover:bg-green-800"
          >
            Find Nearby Shops →
          </Link>
        </header>

        <section className="mt-8 rounded-3xl bg-green-800 p-7 text-white sm:p-10">
          <p className="font-bold tracking-widest text-green-200">
            YOUR LOCAL MARKETPLACE
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            Explore Products 🛍️
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-green-100">
            Browse everyday essentials, discover product categories, and
            explore the possibilities of local shopping with ShopNetwork.
          </p>

          <div className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search rice, milk, vegetables..."
              aria-label="Search products"
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
          <h2 className="text-2xl font-black">Shop by Category</h2>

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
            <h2 className="text-2xl font-black">Popular Everyday Products</h2>

            <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-800">
              {filteredProducts.length} products
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            Sample product listings for demonstration. Prices are illustrative
            and may not match actual local shop prices.
          </p>

          {filteredProducts.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="text-4xl">🔎</p>
              <h3 className="mt-3 text-xl font-bold">No products found</h3>
              <p className="mt-2 text-gray-600">
                Try searching for another product or category.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-32 items-center justify-center rounded-2xl bg-green-50 text-7xl">
                    {product.icon}
                  </div>

                  <p className="mt-4 text-sm font-bold text-green-800">
                    {product.category}
                  </p>

                  <h3 className="mt-1 text-xl font-extrabold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p>

                  <p className="mt-4 text-2xl font-black text-green-800">
                    ₹{product.price}
                  </p>

                  <p className="text-sm text-gray-500">{product.unit}</p>

                  <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                    Demonstration price. Availability at local shops is not
                    verified.
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