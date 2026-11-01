"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Sale = {
  id: number;
  billNumber: string;
  customer: string;
  amount: number;
  date: string;
};

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

export default function ReportsPage() {
  

  const [sales, setSales] = useState<Sale[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [billNumber, setBillNumber] = useState("");
  const [customer, setCustomer] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [saleDate, setSaleDate] = useState("");


  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  // Read the current date after the component mounts, not during prerendering.
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setSaleDate(currentDate);
    setExpenseDate(currentDate);
  }, []);

  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function formatMoney(amount: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  function isInDateRange(date: string) {
    if (startDate && date < startDate) return false;
    if (endDate && date > endDate) return false;
    return true;
  }

  function addSale() {
    const amount = Number(saleAmount);

    if (!billNumber.trim()) {
      setMessage("Please enter a bill number.");
      return;
    }

    if (!saleAmount.trim() || !Number.isFinite(amount) || amount <= 0) {
      setMessage("Please enter a sale amount greater than ₹0.");
      return;
    }

    if (!saleDate) {
      setMessage("Please select the sale date.");
      return;
    }

    if (sales.some((sale) => sale.billNumber === billNumber.trim())) {
      setMessage("That bill number already exists.");
      return;
    }

    setSales((previous) => [
      {
        id: Date.now(),
        billNumber: billNumber.trim(),
        customer: customer.trim() || "Walk-in Customer",
        amount,
        date: saleDate,
      },
      ...previous,
    ]);

    setBillNumber("");
    setCustomer("");
    setSaleAmount("");
    setMessage("Sale recorded successfully!");
  }

  function addExpense() {
    const amount = Number(expenseAmount);

    if (!expenseTitle.trim()) {
      setMessage("Please enter an expense name.");
      return;
    }

    if (
      !expenseAmount.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setMessage("Please enter an expense amount greater than ₹0.");
      return;
    }

    if (!expenseDate) {
      setMessage("Please select the expense date.");
      return;
    }

    setExpenses((previous) => [
      {
        id: Date.now(),
        title: expenseTitle.trim(),
        amount,
        date: expenseDate,
      },
      ...previous,
    ]);

    setExpenseTitle("");
    setExpenseAmount("");
    setMessage("Expense recorded successfully!");
  }

  const filteredSales = sales.filter((sale) =>
    isInDateRange(sale.date)
  );

  const filteredExpenses = expenses.filter((expense) =>
    isInDateRange(expense.date)
  );

  const totalSales = filteredSales.reduce(
    (total, sale) => total + sale.amount,
    0
  );

  const totalExpenses = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const estimatedProfit = totalSales - totalExpenses;

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/shopkeeper" className="backLink">
          ← Dashboard
        </Link>

        <div className="brand">
          <span className="brandIcon">🛍️</span>
          <div>
            <h1>ShopNetwork</h1>
            <p>BUY • SELL • CONNECT</p>
          </div>
        </div>
      </header>

      <section className="heading">
        <span className="eyebrow">SHOP PERFORMANCE</span>
        <h2>📊 Sales Reports</h2>
        <p>Track sales, expenses, and estimated profit for a selected period.</p>
      </section>

      <section className="panel filters">
        <h3>📅 Choose Report Period</h3>

        <div className="filterGrid">
          <label>
            From Date
            <input
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </label>

          <label>
            To Date
            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </label>

          <button
            className="secondaryButton"
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
          >
            Show All Dates
          </button>
        </div>
      </section>

      <section className="summary">
        <article className="summaryCard salesCard">
          <span>💵 Total Sales</span>
          <strong>{formatMoney(totalSales)}</strong>
          <small>{filteredSales.length} recorded sale(s)</small>
        </article>

        <article className="summaryCard expenseCard">
          <span>🧾 Total Expenses</span>
          <strong>{formatMoney(totalExpenses)}</strong>
          <small>{filteredExpenses.length} recorded expense(s)</small>
        </article>

        <article className="summaryCard profitCard">
          <span>📈 Estimated Difference</span>
          <strong>{formatMoney(estimatedProfit)}</strong>
          <small>Sales minus recorded expenses</small>
        </article>
      </section>

      <section className="panel">
        <h3>➕ Record a Sale</h3>

        <div className="formGrid">
          <label>
            Bill Number *
            <input
              value={billNumber}
              onChange={(event) => setBillNumber(event.target.value)}
              placeholder="e.g. BILL-001"
            />
          </label>

          <label>
            Customer Name
            <input
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
              placeholder="Optional"
            />
          </label>

          <label>
            Sale Amount (₹) *
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={saleAmount}
              onChange={(event) => setSaleAmount(event.target.value)}
              placeholder="e.g. 2500"
            />
          </label>

          <label>
            Sale Date *
            <input
              type="date"
              value={saleDate}
              onChange={(event) => setSaleDate(event.target.value)}
            />
          </label>
        </div>

        <button className="primaryButton" onClick={addSale}>
          + Record Sale
        </button>
      </section>

      <section className="panel">
        <h3>➕ Record an Expense</h3>

        <div className="formGrid">
          <label>
            Expense Name *
            <input
              value={expenseTitle}
              onChange={(event) => setExpenseTitle(event.target.value)}
              placeholder="e.g. Electricity bill"
            />
          </label>

          <label>
            Expense Amount (₹) *
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={expenseAmount}
              onChange={(event) => setExpenseAmount(event.target.value)}
              placeholder="e.g. 800"
            />
          </label>

          <label>
            Expense Date *
            <input
              type="date"
              value={expenseDate}
              onChange={(event) => setExpenseDate(event.target.value)}
            />
          </label>
        </div>

        <button className="primaryButton" onClick={addExpense}>
          + Record Expense
        </button>

        {message && (
          <p className="message" role="status">
            {message}
          </p>
        )}
      </section>

      <section className="panel">
        <h3>🛒 Sales History</h3>

        {filteredSales.length === 0 ? (
          <p className="emptyState">
            No sales recorded for this date range. Add a sale above to begin.
          </p>
        ) : (
          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bill Number</th>
                  <th>Customer</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.date}</td>
                    <td>{sale.billNumber}</td>
                    <td>{sale.customer}</td>
                    <td className="money">{formatMoney(sale.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <h3>🧾 Expense History</h3>

        {filteredExpenses.length === 0 ? (
          <p className="emptyState">
            No expenses recorded for this date range. Add an expense above to begin.
          </p>
        ) : (
          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Expense</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.title}</td>
                    <td className="money">{formatMoney(expense.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>
        ShopNetwork © 2026 · Simple tools for local shops
      </footer>

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          padding: 24px;
          background: #f5f8f3;
          color: #183b2b;
          font-family: Arial, Helvetica, sans-serif;
        }

        .topbar,
        .heading,
        .panel,
        .summary,
        footer {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }

        .topbar {
          margin-bottom: 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .backLink {
          color: #167447;
          font-weight: 700;
          text-decoration: none;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brandIcon {
          font-size: 35px;
        }

        .brand h1 {
          margin: 0;
          font-size: 22px;
        }

        .brand p {
          margin: 4px 0 0;
          color: #62816e;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .heading {
          margin-bottom: 25px;
        }

        .eyebrow {
          color: #16804b;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .heading h2 {
          margin: 10px 0;
          font-size: clamp(28px, 4vw, 40px);
        }

        .heading p {
          color: #6b7d71;
          line-height: 1.6;
        }

        .panel {
          padding: 25px;
          margin-bottom: 24px;
          background: white;
          border: 1px solid #e5ece5;
          border-radius: 20px;
          box-shadow: 0 5px 20px #153b2910;
        }

        .panel h3 {
          margin: 0 0 20px;
          font-size: 21px;
        }

        .filters {
          background: #fafffb;
        }

        .filterGrid,
        .formGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          align-items: end;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
        }

        input {
          width: 100%;
          min-width: 0;
          padding: 13px;
          border: 1px solid #d5e0d7;
          border-radius: 10px;
          background: white;
          color: #183b2b;
          font: inherit;
        }

        input:focus {
          outline: 2px solid #54b982;
          outline-offset: 1px;
        }

        .secondaryButton,
        .primaryButton {
          padding: 14px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
        }

        .secondaryButton {
          background: #e4eee6;
          color: #24523a;
        }

        .primaryButton {
          width: 100%;
          margin-top: 20px;
          background: #16804b;
          color: white;
        }

        .primaryButton:hover {
          background: #10663b;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .summaryCard {
          padding: 22px;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .summaryCard span {
          font-weight: 700;
        }

        .summaryCard strong {
          font-size: clamp(22px, 3vw, 30px);
          overflow-wrap: anywhere;
        }

        .summaryCard small {
          opacity: 0.8;
        }

        .salesCard {
          background: #d9f5e3;
        }

        .expenseCard {
          background: #ffebd5;
        }

        .profitCard {
          background: #dceeff;
        }

        .message {
          margin-bottom: 0;
          color: #167447;
          font-weight: 700;
        }

        .emptyState {
          padding: 25px 0;
          color: #718075;
          text-align: center;
          line-height: 1.6;
        }

        .tableWrapper {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        th,
        td {
          padding: 14px 12px;
          border-bottom: 1px solid #edf1ed;
          white-space: nowrap;
        }

        th {
          background: #f5f8f3;
          color: #52675a;
        }

        .money {
          color: #167447;
          font-weight: 800;
        }

        footer {
          padding: 20px 0;
          text-align: center;
          color: #718075;
          font-size: 12px;
        }

        @media (max-width: 650px) {
          .page {
            padding: 15px;
          }

          .summary {
            grid-template-columns: 1fr;
          }

          .formGrid,
          .filterGrid {
            grid-template-columns: 1fr;
          }

          .panel {
            padding: 18px;
          }
        }
      `}</style>
    </main>
  );
}