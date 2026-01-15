import { useEffect, useState } from "react";
import api from "../../services/api";
import GymLoader from "../../components/ui/GymLoader";
import { DollarSign, Download, Plus, CreditCard, Receipt, FileText } from 'lucide-react';


const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        const res = await api.get("/pages/list.php");
        setPages(res.data.data || []);
      } catch (err) {
        console.error("Failed to load pages", err);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Pages</h1>
          <p className="text-sm text-slate-500 mt-1">Manage content Pages</p>
        </div>
        <button className="h-10 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Gym</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {/* LOADER */}
            {loading && (
              <tr>
                <td colSpan="3" className="py-10">
                  <div className="flex justify-center">
                    <GymLoader label="Loading templates..." />
                  </div>
                </td>
              </tr>
            )}
            {!loading && pages.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No templates found
                </td>
              </tr>
            )}
            {pages.map(payment => (
              <tr key={payment.id} className="hover:bg-slate-50">
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{payment.gym}</p></td>
                <td className="px-6 py-4"><p className="text-sm font-semibold text-slate-900">{payment.amount}</p></td>
                <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${payment.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{payment.status}</span></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-600">{payment.date}</p></td>
                <td className="px-6 py-4"><p className="text-sm font-mono text-slate-600">{payment.invoice}</p></td>
                <td className="px-6 py-4"><p className="text-sm text-slate-600">{payment.method}</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default Pages;