"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Sale = {
  id: number;
  billNumber: string;
  customer: string;
  amount: number;
  date: string;
  paymentMethod: "Cash" | "UPI" | "Card";
};

const SAMPLE_SALES: Sale[] = [
  {
    id: 1,
    billNumber: "SN-1001",
    customer: "Customer 1",
    amount: 1250,
    date: "2026-11-01",
    paymentMethod: "UPI",
  },
  {
    id: 2,
    billNumber: "SN-1002",
    customer: "Customer 2",
    amount: 780,
    date: "2026-11-01",
    paymentMethod: "Cash",
  },
  {
    id: 3,
    billNumber: "SN-1003",
    customer: "Customer 3",
    amount: 2150,
    date: "2026-10-30",
    paymentMethod: "Card",
  },
  {
    id: 4,
    billNumber: "SN-1004",
    customer: "Customer 4",
    amount: 560,
    date: "2026-10-28",
    paymentMethod: "UPI",
  },
  {
    id: 5,
    billNumber: "SN-1005",
    customer: "Customer 5",
    amount: 1800,
    date: "2026-10-20",
    paymentMethod: "Cash",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthStart() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-01`;
}

export default function SalesReportsPage() {
  const [sales] = useState<Sale[]>(SAMPLE_SALES);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  // Set date filters after mount to avoid using the current time during prerendering.
  useEffect(() => {
    setStartDate(getMonthStart());
    setEndDate(getToday());
  }, []);

  const filteredSales = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sales.filter((sale) => {
      const matchesDate =
        sale.date >= startDate && sale.date <= endDate;

      const matchesSearch =
        sale.billNumber.toLowerCase().includes(query) ||
        sale.customer.toLowerCase().includes(query) ||
        sale.paymentMethod.toLowerCase().includes(query);

      return matchesDate && matchesSearch;
    });
  }, [sales, startDate, endDate, search]);

  const totalSales = filteredSales.reduce(
    (total, sale) => total + sale.amount,
    0
  );

  const numberOfBills = filteredSales.length;

  const averageBill =
    numberOfBills > 0 ? totalSales / numberOfBills : 0;

  const paymentTotals = {
    Cash: filteredSales
      .filter((sale) => sale.paymentMethod === "Cash")
      .reduce((total, sale) => total + sale.amount, 0),

    UPI: filteredSales
      .filter((sale) => sale.paymentMethod === "UPI")
      .reduce((total, sale) => total + sale.amount, 0),

    Card: filteredSales
      .filter((sale) => sale.paymentMethod === "Card")
      .reduce((total, sale) => total + sale.amount, 0),
  };

  function exportCSV() {
    const headers = [
      "Bill Number",
      "Customer",
      "Date",
      "Payment Method",
      "Amount INR",
    ];

    const rows = filteredSales.map((sale) => [
      sale.billNumber,
      sale.customer,
      sale.date,
      sale.paymentMethod,
      sale.amount.toFixed(2),
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "shopnetwork-sales-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="reports-page">
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

        .reports-page {
          min-height: 100vh;
          padding: 28px 16px 50px;
        }

        .reports-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 30px;
        }

        .reports-brand {
          font-size: 26px;
          font-weight: 800;
        }

        .reports-tagline {
          margin-top: 6px;
          color: #50715a;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .reports-back {
          padding: 12px 16px;
          border: 1px solid #c8ddcc;
          border-radius: 10px;
          background: white;
          color: #183b29;
          text-decoration: none;
          font-weight: 700;
        }

        .reports-title {
          margin: 0 0 10px;
          font-size: 32px;
          font-weight: 800;
        }

        .reports-description {
          margin: 0 0 25px;
          color: #607568;
          line-height: 1.7;
        }

        .reports-filters {
          display: grid;
          grid-template-columns: 1fr 1fr 2fr;
          gap: 16px;
          margin-bottom: 24px;
          padding: 22px;
          border: 1px solid #dce9dc;
          border-radius: 16px;
          background: white;
        }

        .reports-label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        }

        .reports-input {
          width: 100%;
          min-height: 46px;
          padding: 11px 12px;
          border: 1px solid #bcd2c0;
          border-radius: 9px;
          background: white;
          color: #183b29;
          font-size: 15px;
        }

        .reports-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 24px;
        }

        .reports-stat {
          padding: 24px;
          border: 1px solid #dce9dc;
          border-radius: 16px;
          background: white;
          box-shadow: 0 6px 20px rgba(25, 65, 38, 0.05);
        }

        .reports-stat-label {
          margin-bottom: 12px;
          color: #607568;
          font-size: 14px;
          font-weight: 700;
        }

        .reports-stat-value {
          color: #18743d;
          font-size: 27px;
          font-weight: 900;
          overflow-wrap: anywhere;
        }

        .reports-card {
          margin-bottom: 24px;
          padding: 24px;
          border: 1px solid #dce9dc;
          border-radius: 16px;
          background: white;
        }

        .reports-card-title {
          margin: 0 0 20px;
          font-size: 21px;
          font-weight: 800;
        }

        .payment-row {
          margin-bottom: 20px;
        }

        .payment-heading {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 9px;
          font-size: 14px;
          font-weight: 700;
        }

        .payment-track {
          width: 100%;
          height: 12px;
          overflow: hidden;
          border-radius: 20px;
          background: #e7eee7;
        }

        .payment-fill {
          height: 100%;
          border-radius: 20px;
          background: #21864b;
        }

        .reports-table-wrap {
          overflow-x: auto;
        }

        .reports-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .reports-table th,
        .reports-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #e5eee6;
          white-space: nowrap;
        }

        .reports-table th {
          background: #f4f8f3;
          font-size: 13px;
        }

        .reports-empty {
          padding: 30px 12px;
          color: #607568;
          text-align: center;
          white-space: normal !important;
        }

        .reports-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-bottom: 20px;
        }

        .reports-button {
          min-height: 44px;
          padding: 11px 16px;
          border: 0;
          border-radius: 10px;
          background: #21864b;
          color: white;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }

        .reports-button:hover {
          background: #176a39;
        }

        .reports-note {
          color: #68796d;
          font-size: 13px;
          line-height: 1.7;
        }

        @media (max-width: 750px) {
          .reports-page {
            padding: 18px 12px 35px;
          }

          .reports-title {
            font-size: 27px;
          }

          .reports-filters,
          .reports-stats {
            grid-template-columns: 1fr;
          }

          .reports-card,
          .reports-stat {
            padding: 19px 15px;
          }

          .reports-actions {
            justify-content: stretch;
          }

          .reports-button {
            width: 100%;
          }
        }

        @media print {
          body {
            background: white;
          }

          .no-print {
            display: none !important;
          }

          .reports-page {
            padding: 0;
          }

          .reports-card,
          .reports-stat {
            break-inside: avoid;
            box-shadow: none;
          }
        }
      `}</style>

      <div className="reports-container">
        <header className="reports-header">
          <div>
            <div className="reports-brand">🛍️ ShopNetwork</div>
            <div className="reports-tagline">BUY • SELL • CONNECT</div>
          </div>

          <Link href="/shopkeeper" className="reports-back no-print">
            ← Dashboard
          </Link>
        </header>

        <h1 className="reports-title">📊 Sales Reports</h1>

        <p className="reports-description">
          Review sales totals, average bill values, and payment methods.
        </p>

        <section className="reports-filters no-print">
          <div>
            <label className="reports-label" htmlFor="startDate">
              From Date
            </label>

            <input
              id="startDate"
              className="reports-input"
              type="date"
              value={startDate}
              max={endDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>

          <div>
            <label className="reports-label" htmlFor="endDate">
              To Date
            </label>

            <input
              id="endDate"
              className="reports-input"
              type="date"
              value={endDate}
              min={startDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <div>
            <label className="reports-label" htmlFor="reportSearch">
              Search Bills
            </label>

            <input
              id="reportSearch"
              className="reports-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search bill number, customer or payment..."
            />
          </div>
        </section>

        <section className="reports-stats">
          <div className="reports-stat">
            <div className="reports-stat-label">Total Sales</div>
            <div className="reports-stat-value">
              {formatCurrency(totalSales)}
            </div>
          </div>

          <div className="reports-stat">
            <div className="reports-stat-label">Number of Bills</div>
            <div className="reports-stat-value">{numberOfBills}</div>
          </div>

          <div className="reports-stat">
            <div className="reports-stat-label">Average Bill</div>
            <div className="reports-stat-value">
              {formatCurrency(averageBill)}
            </div>
          </div>
        </section>

        <section className="reports-card">
          <h2 className="reports-card-title">💳 Payment Summary</h2>

          {(["Cash", "UPI", "Card"] as const).map((method) => {
            const amount = paymentTotals[method];
            const percentage =
              totalSales > 0 ? (amount / totalSales) * 100 : 0;

            return (
              <div className="payment-row" key={method}>
                <div className="payment-heading">
                  <span>{method}</span>
                  <span>
                    {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                  </span>
                </div>

                <div className="payment-track">
                  <div
                    className="payment-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        <section className="reports-card">
          <div className="reports-actions no-print">
            <button
              className="reports-button"
              type="button"
              onClick={exportCSV}
            >
              ⬇ Export CSV
            </button>

            <button
              className="reports-button"
              type="button"
              onClick={() => window.print()}
            >
              🖨 Print Report
            </button>
          </div>

          <h2 className="reports-card-title">🧾 Bill History</h2>

          <div className="reports-table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Bill Number</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="reports-empty">
                      No sales found for the selected dates.
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.billNumber}</td>
                      <td>{sale.customer}</td>
                      <td>{sale.date}</td>
                      <td>{sale.paymentMethod}</td>
                      <td>{formatCurrency(sale.amount)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="reports-note">
            Demo data only: these example sales are not real transactions
            and are not connected to your billing page or Supabase yet.
            We will connect actual saved bills in a later step.
          </p>
        </section>
      </div>
    </main>
  );
}