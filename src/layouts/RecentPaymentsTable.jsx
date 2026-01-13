import { Download, ExternalLink } from "lucide-react";

const statusColors = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed: "bg-red-100 text-red-700",
};

/**
 * payments = [
 *  {
 *    id,
 *    gym,
 *    amount,
 *    status,
 *    date,
 *    invoice
 *  }
 * ]
 */
const RecentPaymentsTable = ({ payments = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">
          Recent Payments
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Latest payment transactions
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Gym
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-slate-50 transition-colors"
              >
                {/* GYM */}
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">
                    {payment.gym}
                  </p>
                </td>

                {/* AMOUNT */}
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {payment.amount}
                  </p>
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[payment.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>

                {/* DATE */}
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    {payment.date}
                  </p>
                </td>

                {/* INVOICE */}
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 font-mono">
                    {payment.invoice}
                  </p>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          View all payments →
        </button>
      </div>
    </div>
  );
};

export default RecentPaymentsTable;
