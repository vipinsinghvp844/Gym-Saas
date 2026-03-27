import { ChevronLeft, ChevronRight } from "lucide-react";

const TablePagination = ({
  page = 1,
  totalPages = 1,
  total = 0,
  limit = 10,

  onPageChange,
  onLimitChange,

  showLimit = true,
}) => {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white">
      {/* LEFT INFO */}
      <div className="text-sm text-slate-600">
        Total: <span className="font-semibold text-slate-900">{total}</span>
      </div>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-3">
        {/* LIMIT */}
        {showLimit && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Rows:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange?.(Number(e.target.value))}
              className="h-9 px-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}

        {/* PREV */}
        <button
          disabled={!canPrev}
          onClick={() => onPageChange?.(page - 1)}
          className={`h-9 px-3 rounded-lg border text-sm font-medium flex items-center gap-1
            ${
              canPrev
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        {/* PAGE */}
        <div className="text-sm font-medium text-slate-700">
          Page <span className="text-slate-900">{page}</span> /{" "}
          <span className="text-slate-900">{totalPages || 1}</span>
        </div>

        {/* NEXT */}
        <button
          disabled={!canNext}
          onClick={() => onPageChange?.(page + 1)}
          className={`h-9 px-3 rounded-lg border text-sm font-medium flex items-center gap-1
            ${
              canNext
                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
