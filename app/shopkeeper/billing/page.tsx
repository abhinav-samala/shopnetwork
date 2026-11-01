"use client";

import { useState } from "react";
import Link from "next/link";

type BillItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function BillingPage() {
  const [shopName, setShopName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [items, setItems] = useState<BillItem[]>([]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addItem() {
    const cleanName = productName.trim();
    const cleanPrice = Number(price);
    const cleanQuantity = Number(quantity);

    if (!cleanName) {
      alert("Please enter a product name.");
      return;
    }

    if (!price.trim() || !Number.isFinite(cleanPrice) || cleanPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (
      !quantity.trim() ||
      !Number.isInteger(cleanQuantity) ||
      cleanQuantity <= 0
    ) {
      alert("Please enter a valid quantity.");
      return;
    }

    setItems((currentItems) => [
      ...currentItems,
      {
        id: Date.now(),
        name: cleanName,
        price: cleanPrice,
        quantity: cleanQuantity,
      },
    ]);

    setProductName("");
    setPrice("");
    setQuantity("1");
  }

  function removeItem(id: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function printBill() {
    if (items.length === 0) {
      alert("Add at least one product before printing.");
      return;
    }

    window.print();
  }

  return (
    <main className="billing-page">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f0f7ee;
          color: #183b29;
          font-family: Arial, Helvetica, sans-serif;
        }

        .billing-page {
          min-height: 100vh;
          padding: 28px 16px 50px;
        }

        .billing-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .billing-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 24px;
        }

        .billing-brand {
          font-size: 26px;
          font-weight: 800;
        }

        .billing-tagline {
          margin-top: 6px;
          color: #50715a;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .billing-back {
          display: inline-block;
          padding: 12px 16px;
          border: 1px solid #c8ddcc;
          border-radius: 10px;
          color: #183b29;
          text-decoration: none;
          background: white;
          font-weight: 700;
        }

        .billing-card {
          padding: 28px;
          margin-bottom: 22px;
          border: 1px solid #dce9dc;
          border-radius: 20px;
          background: white;
          box-shadow: 0 10px 30px rgba(25, 65, 38, 0.07);
        }

        .billing-title {
          margin: 0 0 8px;
          font-size: 30px;
          font-weight: 800;
        }

        .billing-description {
          margin: 0 0 24px;
          color: #607568;
          line-height: 1.6;
        }

        .billing-label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        }

        .billing-input {
          display: block;
          width: 100%;
          min-height: 48px;
          padding: 12px 14px;
          border: 1px solid #bcd2c0;
          border-radius: 10px;
          outline: none;
          background: #fff;
          color: #183b29;
          font-size: 16px;
        }

        .billing-input:focus {
          border-color: #21864b;
          box-shadow: 0 0 0 3px rgba(33, 134, 75, 0.12);
        }

        .billing-field {
          margin-bottom: 20px;
        }

        .billing-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 16px;
          align-items: end;
        }

        .billing-button {
          min-height: 48px;
          padding: 12px 18px;
          border: 0;
          border-radius: 10px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 800;
        }

        .billing-add {
          width: 100%;
          background: #21864b;
          color: white;
        }

        .billing-add:hover {
          background: #176a39;
        }

        .billing-table-wrap {
          overflow-x: auto;
        }

        .billing-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .billing-table th,
        .billing-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #e5eee6;
          white-space: nowrap;
        }

        .billing-table th {
          background: #f4f8f3;
          font-size: 13px;
        }

        .billing-empty {
          padding: 30px 12px;
          color: #65786b;
          text-align: center;
        }

        .billing-remove {
          padding: 8px 11px;
          border: 0;
          border-radius: 8px;
          background: #fff0ed;
          color: #b42318;
          cursor: pointer;
          font-weight: 700;
        }

        .billing-total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
          padding: 20px;
          border-radius: 14px;
          background: #eaf6ec;
        }

        .billing-total-label {
          font-size: 18px;
          font-weight: 700;
        }

        .billing-total-amount {
          font-size: 30px;
          font-weight: 900;
          color: #18743d;
        }

        .billing-print {
          width: 100%;
          margin-top: 20px;
          background: #183b29;
          color: white;
        }

        .billing-note {
          margin-top: 16px;
          color: #68796d;
          font-size: 13px;
          line-height: 1.6;
        }

        @media (max-width: 650px) {
          .billing-page {
            padding: 18px 12px 35px;
          }

          .billing-card {
            padding: 20px 16px;
          }

          .billing-title {
            font-size: 25px;
          }

          .billing-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .billing-total-amount {
            font-size: 25px;
          }
        }

        @media print {
          body {
            background: white;
          }

          .billing-page {
            padding: 0;
          }

          .no-print {
            display: none !important;
          }

          .billing-card {
            border: 0;
            box-shadow: none;
          }
        }
      `}</style>

      <div className="billing-container">
        <header className="billing-top">
          <div>
            <div className="billing-brand">🛍️ ShopNetwork</div>
            <div className="billing-tagline">BUY • SELL • CONNECT</div>
          </div>

          <Link href="/shopkeeper" className="billing-back no-print">
            ← Dashboard
          </Link>
        </header>

        <section className="billing-card">
          <h1 className="billing-title">🧾 Create New Bill</h1>

          <p className="billing-description">
            Add products, enter their prices and quantities, and calculate
            the bill total.
          </p>

          <div className="billing-field">
            <label className="billing-label" htmlFor="shopName">
              Shop Name
            </label>

            <input
              id="shopName"
              className="billing-input"
              value={shopName}
              onChange={(event) => setShopName(event.target.value)}
              placeholder="Enter your shop name"
            />
          </div>

          <h2 style={{ fontSize: 20, marginBottom: 18 }}>
            Add Products
          </h2>

          <div className="billing-grid no-print">
            <div className="billing-field">
              <label className="billing-label" htmlFor="productName">
                Product Name
              </label>

              <input
                id="productName"
                className="billing-input"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="Example: Rice"
              />
            </div>

            <div className="billing-field">
              <label className="billing-label" htmlFor="price">
                Price (₹)
              </label>

              <input
                id="price"
                className="billing-input"
                type="number"
                min="0.01"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="60"
              />
            </div>

            <div className="billing-field">
              <label className="billing-label" htmlFor="quantity">
                Quantity
              </label>

              <input
                id="quantity"
                className="billing-input"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className="billing-button billing-add no-print"
            onClick={addItem}
          >
            + Add Product
          </button>
        </section>

        <section className="billing-card">
          <h2 style={{ fontSize: 22, marginTop: 0, marginBottom: 20 }}>
            Bill Details
          </h2>

          <div className="billing-table-wrap">
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th className="no-print">Action</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="billing-empty">
                      No products added yet. Add your first product above.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="no-print">
                        <button
                          type="button"
                          className="billing-remove"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="billing-total">
            <div className="billing-total-label">
              {shopName.trim() || "Customer Bill"} — Total Amount
            </div>

            <div className="billing-total-amount">
              ₹{total.toFixed(2)}
            </div>
          </div>

          <button
            type="button"
            className="billing-button billing-print no-print"
            onClick={printBill}
          >
            🖨️ Print Bill
          </button>

          <p className="billing-note no-print">
            Note: This is currently a working demo. Bills are not saved to
            the database yet, and inventory stock is not automatically
            reduced. Those features will be connected next.
          </p>
        </section>
      </div>
    </main>
  );
}