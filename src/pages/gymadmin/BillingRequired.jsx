import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { AlertTriangle, Receipt, Mail, PhoneCall, RefreshCcw } from "lucide-react";

const formatMoney = (amount, currency = "INR") => {
  const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : `${currency} `;
  return `${symbol}${Number(amount || 0).toLocaleString()}`;
};

const formatDate = (dt) => {
  if (!dt) return "-";
  try {
    return new Date(dt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dt;
  }
};

const BillingRequired = () => {
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const loadBillingInfo = async () => {
    try {
      setLoading(true);

      // ✅ who am i
      const meRes = await api.get("/auth/me.php");
      const meData = meRes.data.data || null;
      setMe(meData);

      // ✅ load latest unpaid invoice (if API exists)
      // (अगर अभी ये API नहीं है तो catch में ignore कर देंगे)
      try {
        const invRes = await api.get("/invoices/latest-unpaid.php");
        setInvoice(invRes.data.data || null);
      } catch (err) {
        setInvoice(null);
      }
    } catch (err) {
      console.error("Failed to load billing info", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBillingInfo();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-2xl">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 flex justify-center">
            <GymLoader label="Loading billing status..." />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* TOP BAR */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-amber-50 to-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-700" />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Billing Required
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Your account is locked because your subscription payment is pending.
                    Please complete billing to continue using the system.
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5">
              {/* INFO CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Account
                  </p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {me?.email || "—"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Role: <span className="font-semibold">{me?.role || "gym_admin"}</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-amber-700 mt-1">
                    Locked (Billing Pending)
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Trial ended / payment required
                  </p>
                </div>
              </div>

              {/* INVOICE BLOCK */}
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Receipt className="w-4 h-4 text-indigo-600" />
                  <p className="text-sm font-semibold text-slate-900">
                    Latest Pending Invoice
                  </p>
                </div>

                {invoice ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-500">Invoice #</p>
                      <p className="text-sm font-mono font-semibold text-slate-900 mt-1">
                        {invoice.invoice_number || "—"}
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-500">Amount</p>
                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        {formatMoney(invoice.amount, invoice.currency)}
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-500">Due Date</p>
                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        {formatDate(invoice.due_date)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-amber-800">
                      Invoice not generated yet
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      Please contact support, or ask admin to generate an invoice.
                    </p>
                  </div>
                )}

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={loadBillingInfo}
                    className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Refresh Status
                  </button>

                  <button
                    onClick={() => alert("Pay Now integration next step ✅")}
                    className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold"
                  >
                    Pay Now
                  </button>
                </div>
              </div>

              {/* SUPPORT */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Need help?
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Contact support to activate your subscription quickly.
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => (window.location.href = "mailto:support@gymplatform.com")}
                    className="h-10 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </button>

                  <button
                    onClick={() => alert("Support phone setup next step ✅")}
                    className="h-10 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Call Support
                  </button>
                </div>
              </div>

              {/* NOTE */}
              <p className="text-xs text-slate-500 leading-relaxed">
                ⚠️ Your dashboard is temporarily locked due to pending payment.  
                Once your invoice is marked paid by admin or payment gateway, access will restore automatically.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingRequired;
