"use client";

import { useState } from "react";

type BillItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function BillingPage() {
  const [shopName, setShopName] = useState("My Shop");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [items, setItems] = useState<BillItem[]>([]);
  const [message, setMessage] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = productName.trim();
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (!name) {
      setMessage("Please enter a product name.");
      return;
    }

    if (
      price.trim() === "" ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      setMessage("Please enter a valid, non-negative price.");
      return;
    }

    if (
      quantity.trim() === "" ||
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity < 1
    ) {
      setMessage("Quantity must be a whole number greater than zero.");
      return;
    }

    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        name,
        price: parsedPrice,
        quantity: parsedQuantity,
      },
    ]);

    setProductName("");
    setPrice("");
    setQuantity("1");
    setMessage("");
  }

  function removeProduct(id: number) {
    setItems((current) => current.filter((item) => item.id !== id));
    setMessage("");
  }

  function printBill() {
    if (items.length === 0) {
      setMessage("Add at least one product before printing the bill.");
      return;
    }

    window.print();
  }

  return (
    <main className="min-h-screen bg-[#F6F8F4] px-4 py-6 text-gray-800 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <a href="/shopkeeper" className="text-lg font-bold text-green-800">
            ← Back to Dashboard
          </a>

          <a
            href="/"
            className="font-semibold text-gray-600 hover:text-green-800"
          >
            ShopNetwork Home
          </a>
        </header>

        <section className="rounded-3xl bg-green-800 p-6 text-white sm:p-8">
          <p className="text-sm font-bold tracking-widest text-green-200">
            SHOPNETWORK BILLING
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Create a Bill 🧾
          </h1>

          <p className="mt-3 text-green-100">
            Add products and quantities to calculate the bill total.
          </p>

          <label className="mt-5 block max-w-md">
            <span className="mb-2 block text-sm font-semibold">
              Shop name
            </span>

            <input
              value={shopName}
              onChange={(event) => setShopName(event.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 text-gray-800 outline-none focus:ring-4 focus:ring-green-300"
              placeholder="Enter your shop name"
            />
          </label>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-extrabold">Add a Product</h2>

          <form
            onSubmit={addProduct}
            className="mt-5 grid gap-4 sm:grid-cols-2"
          >
            <label className="sm:col-span-2">
              <span className="mb-2 block font-semibold">Product name</span>

              <input
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="Example: Rice, Milk, Soap"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />
            </label>

            <label>
              <span className="mb-2 block font-semibold">Price (₹)</span>

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
              <span className="mb-2 block font-semibold">Quantity</span>

              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
              />
            </label>

            <button
              type="submit"
              className="rounded-xl bg-green-700 px-5 py-4 font-bold text-white hover:bg-green-800 sm:col-span-2"
            >
              + Add Product to Bill
            </button>
          </form>

          {message && (
            <p
              role="alert"
              className="mt-4 rounded-xl bg-orange-50 p-4 font-semibold text-orange-800"
            >
              {message}
            </p>
          )}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold">Current Bill</h2>

            <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-800">
              {items.length} product{items.length === 1 ? "" : "s"}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-200 px-4 py-10 text-center">
              <p className="text-4xl">🛒</p>
              <p className="mt-3 font-semibold">No products added yet.</p>
              <p className="mt-2 text-sm text-gray-500">
                Add your first product using the form above.
              </p>
            </div>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="px-3 py-3">Product</th>
                    <th className="px-3 py-3">Price</th>
                    <th className="px-3 py-3">Qty</th>
                    <th className="px-3 py-3 text-right">Subtotal</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="px-3 py-4 font-semibold">{item.name}</td>
                      <td className="px-3 py-4">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="px-3 py-4">{item.quantity}</td>
                      <td className="px-3 py-4 text-right font-bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-3 py-4">
                        <button
                          type="button"
                          onClick={() => removeProduct(item.id)}
                          className="font-semibold text-red-600 hover:text-red-800"
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 rounded-2xl bg-green-50 p-5 sm:p-6">
            <p className="text-sm font-semibold text-gray-600">Bill Total</p>

            <p className="mt-2 text-4xl font-black text-green-800">
              ₹{total.toFixed(2)}
            </p>

            <button
              type="button"
              onClick={printBill}
              className="mt-5 w-full rounded-xl bg-green-700 px-5 py-4 font-bold text-white hover:bg-green-800"
            >
              🖨️ Print Bill
            </button>
          </div>
        </section>

        <p className="mt-6 text-center text-sm text-gray-500">
          ShopNetwork • BUY • SELL • CONNECT
        </p>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          main,
          main * {
            visibility: visible;
          }

          main {
            position: absolute;
            inset: 0;
            width: 100%;
            padding: 0 !important;
            background: white !important;
          }

          main > header,
          main > section:first-of-type,
          main > section:nth-of-type(2),
          main > p,
          main button {
            display: none !important;
          }

          main > section:nth-of-type(3) {
            display: block !important;
            margin: 0 !important;
            padding: 16px !important;
            box-shadow: none !important;
          }

          main > section:nth-of-type(3) > div:first-child > span {
            display: none !important;
          }

          main > section:nth-of-type(3) button {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}