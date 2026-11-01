"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
};

const initialProducts: Product[] = [
  { id: 1, name: "Rice", price: 60, stock: 25, category: "Groceries" },
  { id: 2, name: "Milk", price: 30, stock: 8, category: "Dairy" },
  { id: 3, name: "Soap", price: 35, stock: 3, category: "Personal Care" },
  { id: 4, name: "Sugar", price: 45, stock: 15, category: "Groceries" },
];

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = name.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!cleanName) {
      setMessage("Please enter a product name.");
      return;
    }

    if (
      price.trim() === "" ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      setMessage("Enter a valid price greater than or equal to zero.");
      return;
    }

    if (
      stock.trim() === "" ||
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      setMessage("Stock must be a whole number of zero or more.");
      return;
    }

    const existingProduct = products.find(
      (product) => product.name.toLowerCase() === cleanName.toLowerCase(),
    );

    if (existingProduct) {
      setMessage("This product already exists. Update its stock instead.");
      return;
    }

    setProducts((current) => [
      ...current,
      {
        id: Date.now(),
        name: cleanName,
        price: parsedPrice,
        stock: parsedStock,
        category,
      },
    ]);

    setName("");
    setPrice("");
    setStock("");
    setCategory("Groceries");
    setMessage("Product added successfully.");
  }

  function updateStock(id: number, change: number) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, stock: Math.max(0, product.stock + change) }
          : product,
      ),
    );

    setMessage("");
  }

  function deleteProduct(id: number) {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    if (!window.confirm(`Delete ${product.name} from inventory?`)) return;

    setProducts((current) => current.filter((item) => item.id !== id));
    setMessage("Product deleted.");
  }

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  );

  const lowStockCount = products.filter((product) => product.stock <= 5).length;

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-4 py-6 text-gray-800 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="/shopkeeper"
            className="font-bold text-green-800 hover:underline"
          >
            ← Back to Dashboard
          </a>

          <a href="/" className="font-semibold text-gray-600 hover:underline">
            ShopNetwork Home
          </a>
        </header>

        <section className="mt-6 rounded-3xl bg-green-800 p-6 text-white sm:p-9">
          <p className="font-bold tracking-widest text-green-200">
            SHOP MANAGEMENT
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Products & Inventory 📦
          </h1>

          <p className="mt-3 leading-7 text-green-100">
            Add products, manage prices, and track available stock.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-green-100">Total Products</p>
              <p className="mt-1 text-3xl font-black">{products.length}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-green-100">Low Stock Items</p>
              <p className="mt-1 text-3xl font-black">{lowStockCount}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-green-100">Inventory Status</p>
              <p className="mt-1 text-xl font-extrabold">
                {lowStockCount > 0 ? "Needs Attention" : "Stock Available"}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-extrabold">Add New Product</h2>

          <form
            onSubmit={addProduct}
            className="mt-5 grid gap-4 sm:grid-cols-2"
          >
            <label>
              <span className="mb-2 block font-semibold">Product Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Example: Rice"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />
            </label>

            <label>
              <span className="mb-2 block font-semibold">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
              >
                <option>Groceries</option>
                <option>Vegetables</option>
                <option>Dairy</option>
                <option>Snacks</option>
                <option>Beverages</option>
                <option>Personal Care</option>
                <option>Household</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block font-semibold">Selling Price (₹)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Example: 50"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />
            </label>

            <label>
              <span className="mb-2 block font-semibold">Available Stock</span>
              <input
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                placeholder="Example: 20"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />
            </label>

            <button
              type="submit"
              className="rounded-xl bg-green-700 px-5 py-4 font-bold text-white hover:bg-green-800 sm:col-span-2"
            >
              + Add Product
            </button>
          </form>

          {message && (
            <p
              role="status"
              className="mt-4 rounded-xl bg-green-50 p-4 font-semibold text-green-800"
            >
              {message}
            </p>
          )}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-extrabold">Product List</h2>
              <p className="mt-1 text-gray-600">
                Update stock or remove products.
              </p>
            </div>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {filteredProducts.length === 0 ? (
            <p className="mt-6 rounded-xl bg-gray-50 p-6 text-center text-gray-600">
              No products found.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="rounded-2xl border border-gray-200 p-4 sm:p-5"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-extrabold">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>

                      <p className="mt-2 text-xl font-bold text-green-800">
                        ₹{product.price.toFixed(2)}
                      </p>

                      <p
                        className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-bold ${
                          product.stock <= 5
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.stock <= 5
                          ? "⚠️ Low Stock"
                          : "✓ Stock Available"}{" "}
                        · {product.stock} units
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateStock(product.id, -1)}
                        disabled={product.stock === 0}
                        className="h-11 w-11 rounded-xl border border-gray-300 text-xl font-bold disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label={`Decrease ${product.name} stock`}
                      >
                        −
                      </button>

                      <span className="min-w-10 text-center font-bold">
                        {product.stock}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateStock(product.id, 1)}
                        className="h-11 w-11 rounded-xl border border-gray-300 text-xl font-bold hover:bg-green-50"
                        aria-label={`Increase ${product.name} stock`}
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="py-8 text-center text-sm text-gray-500">
          ShopNetwork • BUY • SELL • CONNECT
        </footer>
      </div>
    </main>
  );
}