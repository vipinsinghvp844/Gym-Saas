import { ExternalLink, Edit, Trash2 } from "lucide-react";

const statusColors = {
  active: "bg-green-100 text-green-700",
  trial: "bg-amber-100 text-amber-700",
  suspended: "bg-red-100 text-red-700",
};

const LatestGymsTable = ({ gyms = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">
          Latest Gyms
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Recently registered gym accounts
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {gyms.map((gym) => (
              <tr
                key={gym.id}
                className="hover:bg-slate-50 transition-colors"
              >
                {/* NAME */}
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">
                    {gym.name}
                  </p>
                </td>

                {/* PLAN (HARDCODED FOR NOW) */}
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    Professional
                  </p>
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[gym.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {gym.status}
                  </span>
                </td>

                {/* CREATED DATE */}
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    {gym.created_at}
                  </p>
                </td>

                {/* ACTIONS (HARDCODED UI) */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {gyms.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No gyms found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View all gyms →
        </button>
      </div>
    </div>
  );
};

export default LatestGymsTable;
