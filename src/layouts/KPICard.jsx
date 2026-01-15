import React from 'react';

export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  iconBgColor,
}) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-600 mb-2">{title}</p>
            <p className="text-3xl font-semibold text-slate-900 mb-3">
              {value}
            </p>

            <div className="flex items-center gap-1.5">
              <span
                className={`text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isPositive ? '+' : ''}
                {change}%
              </span>
              <span className="text-sm text-slate-500">
                vs last month
              </span>
            </div>
          </div>

          <div
            className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center flex-shrink-0`}
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
