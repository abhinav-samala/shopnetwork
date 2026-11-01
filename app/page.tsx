"use client";

import { useState } from "react";
import Link from "next/link";

type Category = {
  icon: string;
  name: string;
  color: string;
};

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");

  const categories: Category[] = [
    { icon: "🛒", name: "Groceries", color: "bg-orange-100" },
    { icon: "🥦", name: "Vegetables", color: "bg-green-200" },
    { icon: "🥛", name: "Milk & Dairy", color: "bg-blue-100" },
    { icon: "🍪", name: "Snacks", color: "bg-pink-100" },
  ];

  function searchProducts(query: string): void {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      alert("Please enter a product name.");
      return;
    }

    window.location.href =
      "/products?search=" + encodeURIComponent(cleanQuery);
  }

  function handleVoiceSearch(): void {
    type RecognitionType = new () => {
      lang: string;
      start: () => void;
      onresult: (event: {
        results: ArrayLike<ArrayLike<{ transcript: string }>>;
      }) => void;
      onerror: () => void;
    };

    const browser = window as Window & {
      SpeechRecognition?: RecognitionType;
      webkitSpeechRecognition?: RecognitionType;
    };

    const Recognition =
      browser.SpeechRecognition ?? browser.webkitSpeechRecognition;

    if (!Recognition) {
      alert("Voice search is not supported. Please type your search.");
      return;
    }

    const recognition = new Recognition();

    recognition.lang =
      language === "తెలుగు"
        ? "te-IN"
        : language === "हिन्दी"
          ? "hi-IN"
          : "en-IN";

    recognition.onresult = (event) => {
      const recognizedText = event.results[0][0].transcript;
      setSearch(recognizedText);
      searchProducts(recognizedText);
    };

    recognition.onerror = () => {
      alert("Could not recognize your voice. Please try again.");
    };

    try {
      recognition.start();
    } catch {
      alert("Could not start the microphone. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFDF7] text-gray-800">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-5 shadow-sm">
        <Link href="/" className="block">
          <h1 className="text-3xl font-extrabold text-green-700">
            🛍️ ShopNetwork
          </h1>
          <p className="text-xs font-bold tracking-widest text-gray-500">
            BUY • SELL • CONNECT
          </p>
        </Link>

        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          aria-label="Choose language"
          className="rounded-xl border border-gray-300 bg-white p-3"
        >
          <option>English</option>
          <option>తెలుగు</option>
          <option>हिन्दी</option>
        </select>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 font-semibold text-green-800">
              🏪 Your local marketplace
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Your neighbourhood,
              <span className="mt-2 block text-green-700">
                all in one place!
              </span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Discover nearby shops, explore products and support local
              businesses with ShopNetwork.
            </p>

            {/* Product Search */}
            <form
              className="mt-8 flex items-center gap-2 rounded-2xl border-2 border-green-200 bg-white p-2"
              onSubmit={(event) => {
                event.preventDefault();
                searchProducts(search);
              }}
            >
              <span className="pl-2 text-xl" aria-hidden="true">
                🔎
              </span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="What are you looking for?"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent p-3 outline-none"
              />

              <button
                type="button"
                onClick={handleVoiceSearch}
                aria-label="Search by voice"
                className="rounded-xl bg-orange-100 px-4 py-3 text-xl hover:bg-orange-200"
              >
                🎤
              </button>

              <button
                type="submit"
                className="rounded-xl bg-green-700 px-4 py-3 font-bold text-white hover:bg-green-800"
              >
                Go
              </button>
            </form>

            <p className="mt-2 text-sm text-gray-500">
              🎤 Tap the microphone to search by voice.
            </p>

            {/* Main Navigation */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shops"
                className="rounded-xl bg-green-700 px-5 py-4 font-bold text-white hover:bg-green-800"
              >
                📍 Find Nearby Shops
              </Link>

              <Link
                href="/products"
                className="rounded-xl border-2 border-green-700 bg-white px-5 py-4 font-bold text-green-800 hover:bg-green-50"
              >
                🛍️ Explore Products
              </Link>
            </div>
          </div>

          {/* Product Categories */}
          <div className="rounded-3xl bg-green-100 p-6 sm:p-8">
            <h3 className="mb-5 text-2xl font-extrabold">
              Explore Categories
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={
                    "/products?category=" +
                    encodeURIComponent(category.name)
                  }
                  className={`${category.color} rounded-2xl p-6 text-left transition hover:-translate-y-1 hover:shadow-md`}
                >
                  <span className="block text-4xl" aria-hidden="true">
                    {category.icon}
                  </span>

                  <span className="mt-3 block font-bold">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-5 rounded-2xl bg-white p-4 font-semibold">
              🤝 Local shops. Easy shopping. Stronger communities.
            </p>
          </div>
        </div>
      </section>

      {/* Customer and Shopkeeper Section */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold">
            Get Started with ShopNetwork
          </h2>

          <p className="mt-3 text-center text-gray-600">
            Choose how you want to use our platform.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Shopkeeper Card */}
            <Link
              href="/shopkeeper/login"
              className="rounded-2xl border-2 border-green-200 bg-green-50 p-7 transition hover:border-green-600 hover:shadow-md"
            >
              <span className="text-4xl" aria-hidden="true">
                🧑‍💼
              </span>

              <h3 className="mt-4 text-xl font-extrabold text-green-800">
                I&apos;m a Shopkeeper
              </h3>

              <p className="mt-2 leading-7 text-gray-600">
                Manage billing, products, inventory and shop expenses.
              </p>

              <span className="mt-4 block font-bold text-green-800">
                Get Started →
              </span>
            </Link>

            {/* Customer Card */}
            <Link
              href="/customer"
              className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-7 transition hover:border-blue-500 hover:shadow-md"
            >
              <span className="text-4xl" aria-hidden="true">
                🛍️
              </span>

              <h3 className="mt-4 text-xl font-extrabold text-blue-800">
                I&apos;m a Customer
              </h3>

              <p className="mt-2 leading-7 text-gray-600">
                Find nearby shops and discover products.
              </p>

              <span className="mt-4 block font-bold text-blue-800">
                Start Shopping →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 px-6 py-8 text-center text-white">
        <h2 className="text-xl font-extrabold">ShopNetwork</h2>

        <p className="mt-2 tracking-widest">
          BUY • SELL • CONNECT
        </p>

        <p className="mt-3 text-sm text-green-100">
          © 2026 ShopNetwork. All rights reserved.
        </p>
      </footer>
    </main>
  );
}