// src/utils/date.js

export const formatDate = (dateValue, locale = "en-IN") => {
  if (!dateValue) return "-";

  try {
    const d = new Date(dateValue);

    if (isNaN(d.getTime())) return "-";

    return d.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return "-";
  }
};

export const formatDateTime = (dateValue, locale = "en-IN") => {
  if (!dateValue) return "-";

  try {
    const d = new Date(dateValue);

    if (isNaN(d.getTime())) return "-";

    return d.toLocaleString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "-";
  }
};
