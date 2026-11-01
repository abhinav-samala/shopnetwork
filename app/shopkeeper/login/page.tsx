"use client";

import { useState } from "react";
import Link from "next/link";

export default function ShopkeeperLoginPage() {
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  function handleSendOTP(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setMessage(
      "Your mobile number is valid. OTP login is not connected yet. We will connect Supabase OTP next."
    );
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <Link href="/" className="brand">
          <span className="brand-icon">🛍️</span>
          <span>ShopNetwork</span>
        </Link>

        <p className="tagline">BUY • SELL • CONNECT</p>

        <div className="login-heading">
          <div className="login-icon">🏪</div>

          <h1>Shopkeeper Login</h1>

          <p>Welcome! Manage your shop in one place.</p>
        </div>

        <form onSubmit={handleSendOTP}>
          <label htmlFor="mobile">Mobile Number</label>

          <div className="mobile-input">
            <span className="country-code">🇮🇳 +91</span>

            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Enter 10-digit number"
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value.replace(/\D/g, "").slice(0, 10));
                setMessage("");
              }}
              maxLength={10}
              required
            />
          </div>

          <button type="submit" className="send-button">
            Send OTP <span aria-hidden="true">→</span>
          </button>

          {message && (
            <p
              className={
                message.startsWith("Your mobile")
                  ? "status-message"
                  : "status-message error-message"
              }
              role="status"
            >
              {message}
            </p>
          )}
        </form>

        <div className="notice">
          <span>🔒</span>
          <p>
            Secure login for your shop. Phone OTP verification will be enabled
            after authentication is configured.
          </p>
        </div>

        <div className="back-links">
          <Link href="/shopkeeper">← Back to Shopkeeper Dashboard</Link>
          <Link href="/">Back to Home</Link>
        </div>

        <div className="footer-text">
          © 2026 ShopNetwork · BUY • SELL • CONNECT
        </div>
      </section>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          background: #edf5ec;
          color: #183322;
          font-family: Arial, Helvetica, sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 460px;
          padding: 36px;
          background: #ffffff;
          border: 1px solid #d9e7d9;
          border-radius: 24px;
          box-shadow: 0 12px 40px rgba(25, 75, 40, 0.12);
        }

        .brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #176b37;
          font-size: 27px;
          font-weight: 800;
          text-decoration: none;
        }

        .brand-icon {
          font-size: 30px;
        }

        .tagline {
          margin: 10px 0 30px;
          text-align: center;
          color: #50735a;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .login-heading {
          text-align: center;
          margin-bottom: 28px;
        }

        .login-icon {
          width: 66px;
          height: 66px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: #e5f5e7;
          font-size: 32px;
        }

        h1 {
          margin: 0 0 10px;
          color: #183322;
          font-size: 27px;
          font-weight: 800;
        }

        .login-heading p {
          margin: 0;
          color: #5c6f61;
          font-size: 15px;
          line-height: 1.6;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        label {
          color: #243d2b;
          font-size: 15px;
          font-weight: 700;
        }

        .mobile-input {
          width: 100%;
          min-height: 56px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          border: 2px solid #cbd8cd;
          border-radius: 12px;
          background: #ffffff;
        }

        .mobile-input:focus-within {
          border-color: #218447;
          box-shadow: 0 0 0 3px rgba(33, 132, 71, 0.12);
        }

        .country-code {
          flex-shrink: 0;
          color: #243d2b;
          font-size: 14px;
          font-weight: 700;
        }

        .mobile-input input {
          width: 100%;
          min-width: 0;
          padding: 12px 0;
          border: none;
          outline: none;
          background: transparent;
          color: #183322;
          font-size: 16px;
          box-shadow: none;
        }

        .mobile-input input::placeholder {
          color: #849087;
          opacity: 1;
        }

        .send-button {
          width: 100%;
          min-height: 54px;
          margin-top: 8px;
          padding: 14px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border: none;
          border-radius: 12px;
          background: #218447;
          color: #ffffff;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .send-button:hover {
          background: #176b36;
          transform: translateY(-1px);
        }

        .status-message {
          margin: 4px 0;
          padding: 12px;
          border-radius: 10px;
          background: #e8f5e9;
          color: #176b36;
          font-size: 14px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .error-message {
          background: #fff0ef;
          color: #b42318;
        }

        .notice {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 24px;
          padding: 14px;
          border-radius: 12px;
          background: #f3f7f1;
        }

        .notice span {
          font-size: 19px;
        }

        .notice p {
          margin: 0;
          color: #526657;
          font-size: 12px;
          line-height: 1.7;
        }

        .back-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          margin-top: 25px;
        }

        .back-links a {
          color: #176b36;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
        }

        .back-links a:hover {
          text-decoration: underline;
        }

        .footer-text {
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px solid #e5ece5;
          color: #849087;
          font-size: 11px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 26px 20px;
            border-radius: 18px;
          }

          h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </main>
  );
}