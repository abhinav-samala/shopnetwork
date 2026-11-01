"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Expense = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  note: string;
};

const categories = [
  "Rent",
  "Electricity",
  "Transport",
  "Stock Purchase",
  "Staff Salary",
  "Maintenance",
  "Other",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Other");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<string>("");

useEffect(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  setDate(`${year}-${month}-${day}`);
}, []);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");

  function addExpense() {
    const cleanTitle = title.trim();
    const cleanAmount = Number(amount);

    if (!cleanTitle) {
      alert("Please enter an expense name.");
      return;
    }

    if (
      !amount.trim() ||
      !Number.isFinite(cleanAmount) ||
      cleanAmount <= 0
    ) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    if (!date) {
      alert("Please select an expense date.");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      title: cleanTitle,
      category,
      amount: Math.round(cleanAmount * 100) / 100,
      date,
      note: note.trim(),
    };

    setExpenses((current) => [newExpense, ...current]);

    setTitle("");
    setCategory("Other");
    setAmount("");
    setNote("");

    alert("Expense added successfully!");
  }

  function deleteExpense(id: number) {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    setExpenses((current) => current.filter((item) => item.id !== id));
  }

  const filteredExpenses = expenses.filter((expense) => {
    const query = search.trim().toLowerCase();

    return (
      expense.title.toLowerCase().includes(query) ||
      expense.category.toLowerCase().includes(query) ||
      expense.note.toLowerCase().includes(query)
    );
  });

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const today = new Date().toLocaleDateString("en-CA");

  const todayExpenses = expenses
    .filter((expense) => expense.date === today)
    .reduce((total, expense) => total + expense.amount, 0);

  const thisMonth = new Date().toISOString().slice(0, 7);

  const monthlyExpenses = expenses
    .filter((expense) => expense.date.startsWith(thisMonth))
    .reduce((total, expense) => total + expense.amount, 0);

  return (
    <main className="expenses-page">
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

        .expenses-page {
          min-height: 100vh;
          padding: 28px 16px 50px;
        }

        .expenses-container {
          width: 100%;
          max-width: 1050px;
          margin: 0 auto;
        }

        .expenses-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 25px;
        }

        .expenses-brand {
          font-size: 26px;
          font-weight: 800;
        }

        .expenses-tagline {
          margin-top: 6px;
          color: #50715a;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .expenses-back {
          display: inline-block;
          padding: 12px 16px;
          border: 1px solid #c8ddcc;
          border-radius: 10px;
          background: white;
          color: #183b29;
          text-decoration: none;
          font-weight: 700;
        }

        .expenses-heading {
          margin: 0 0 8px;
          font-size: 32px;
          font-weight: 800;
        }

        .expenses-subtitle {
          margin: 0 0 25px;
          color: #607568;
          line-height: 1.6;
        }

        .expenses-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .expenses-stat {
          padding: 22px;
          border: 1px solid #dce9dc;
          border-radius: 16px;
          background: white;
          box-shadow: 0 5px 20px rgba(25, 65, 38, 0.04);
        }

        .expenses-stat-label {
          margin-bottom: 12px;
          color: #607568;
          font-size: 14px;
          font-weight: 700;
        }

        .expenses-stat-value {
          color: #18743d;
          font-size: 26px;
          font-weight: 900;
          overflow-wrap: anywhere;
        }

        .expenses-card {
          padding: 26px;
          margin-bottom: 24px;
          border: 1px solid #dce9dc;
          border-radius: 18px;
          background: white;
          box-shadow: 0 8px 25px rgba(25, 65, 38, 0.05);
        }

        .expenses-card-title {
          margin: 0 0 22px;
          font-size: 22px;
          font-weight: 800;
        }

        .expenses-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .expenses-field {
          margin-bottom: 18px;
        }

        .expenses-label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        }

        .expenses-input {
          width: 100%;
          min-height: 48px;
          padding: 12px 14px;
          border: 1px solid #bcd2c0;
          border-radius: 10px;
          background: white;
          color: #183b29;
          font-size: 16px;
        }

        .expenses-input:focus {
          outline: 2px solid #21864b;
          outline-offset: 1px;
        }

        .expenses-button {
          min-height: 48px;
          padding: 12px 18px;
          border: 0;
          border-radius: 10px;
          background: #21864b;
          color: white;
          cursor: pointer;
          font-size: 15px;
          font-weight: 800;
        }

        .expenses-button:hover {
          background: #176a39;
        }

        .expenses-add-button {
          width: 100%;
        }

        .expenses-search {
          margin-bottom: 18px;
        }

        .expenses-table-wrap {
          overflow-x: auto;
        }

        .expenses-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .expenses-table th,
        .expenses-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #e5eee6;
          white-space: nowrap;
        }

        .expenses-table th {
          background: #f4f8f3;
          font-size: 13px;
        }

        .expenses-empty {
          padding: 35px 12px;
          color: #607568;
          text-align: center;
          white-space: normal !important;
        }

        .expenses-delete {
          padding: 9px 12px;
          border: 0;
          border-radius: 8px;
          background: #fff0ed;
          color: #b42318;
          cursor: pointer;
          font-weight: 700;
        }

        .expenses-note {
          margin-top: 18px;
          color: #68796d;
          font-size: 13px;
          line-height: 1.6;
        }

        @media (max-width: 700px) {
          .expenses-page {
            padding: 18px 12px 35px;
          }

          .expenses-heading {
            font-size: 27px;
          }

          .expenses-stats {
            grid-template-columns: 1fr;
          }

          .expenses-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .expenses-card {
            padding: 20px 15px;
          }
        }
      `}</style>

      <div className="expenses-container">
        <header className="expenses-header">
          <div>
            <div className="expenses-brand">🛍️ ShopNetwork</div>
            <div className="expenses-tagline">BUY • SELL • CONNECT</div>
          </div>

          <Link href="/shopkeeper" className="expenses-back">
            ← Dashboard
          </Link>
        </header>

        <h1 className="expenses-heading">💸 Shop Expenses</h1>

        <p className="expenses-subtitle">
          Record your shop costs and keep track of your spending.
        </p>

        <section className="expenses-stats">
          <div className="expenses-stat">
            <div className="expenses-stat-label">All Recorded Expenses</div>
            <div className="expenses-stat-value">
              ₹{totalExpenses.toFixed(2)}
            </div>
          </div>

          <div className="expenses-stat">
            <div className="expenses-stat-label">Today's Expenses</div>
            <div className="expenses-stat-value">
              ₹{todayExpenses.toFixed(2)}
            </div>
          </div>

          <div className="expenses-stat">
            <div className="expenses-stat-label">This Month</div>
            <div className="expenses-stat-value">
              ₹{monthlyExpenses.toFixed(2)}
            </div>
          </div>
        </section>

        <section className="expenses-card">
          <h2 className="expenses-card-title">➕ Add New Expense</h2>

          <div className="expenses-grid">
            <div className="expenses-field">
              <label className="expenses-label" htmlFor="expenseTitle">
                Expense Name
              </label>

              <input
                id="expenseTitle"
                className="expenses-input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: Electricity bill"
              />
            </div>

            <div className="expenses-field">
              <label className="expenses-label" htmlFor="expenseCategory">
                Category
              </label>

              <select
                id="expenseCategory"
                className="expenses-input"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="expenses-field">
              <label className="expenses-label" htmlFor="expenseAmount">
                Amount (₹)
              </label>

              <input
                id="expenseAmount"
                className="expenses-input"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Example: 1500"
              />
            </div>

            <div className="expenses-field">
              <label className="expenses-label" htmlFor="expenseDate">
                Expense Date
              </label>

              <input
                id="expenseDate"
                className="expenses-input"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
          </div>

          <div className="expenses-field">
            <label className="expenses-label" htmlFor="expenseNote">
              Notes (Optional)
            </label>

            <input
              id="expenseNote"
              className="expenses-input"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add a short description"
            />
          </div>

          <button
            type="button"
            className="expenses-button expenses-add-button"
            onClick={addExpense}
          >
            + Save Expense
          </button>
        </section>

        <section className="expenses-card">
          <h2 className="expenses-card-title">📋 Expense History</h2>

          <input
            className="expenses-input expenses-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search expenses by name, category or note..."
            aria-label="Search expenses"
          />

          <div className="expenses-table-wrap">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Expense</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="expenses-empty">
                      No expenses found. Add your first expense above.
                    </td>
                  </tr>
                ) : (
                  filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.date}</td>
                      <td>
                        <strong>{expense.title}</strong>
                        {expense.note && (
                          <div
                            style={{
                              marginTop: 5,
                              color: "#607568",
                              fontSize: 12,
                            }}
                          >
                            {expense.note}
                          </div>
                        )}
                      </td>
                      <td>{expense.category}</td>
                      <td>₹{expense.amount.toFixed(2)}</td>
                      <td>
                        <button
                          type="button"
                          className="expenses-delete"
                          onClick={() => deleteExpense(expense.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="expenses-note">
            Demo note: expenses are currently stored in page memory only.
            Refreshing the page will clear them. We will connect Supabase
            so expenses can be saved permanently in a later step.
          </p>
        </section>
      </div>
    </main>
  );
}