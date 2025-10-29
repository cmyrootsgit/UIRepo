export const fromDotNetTicks = (ticks: number) => {
  const epochTicks = 621355968000000000; // Ticks at 1970-01-01
  const ticksPerMillisecond = 10000;
  return new Date((ticks - epochTicks) / ticksPerMillisecond);
};

// Main timestamp formatter
export const formatTimestamp = (
  dateInput: string | number | Date,
  options?: Intl.DateTimeFormatOptions
) => {
  if (!dateInput) return "";

  let date: Date;

  // Convert string numbers to number
  if (typeof dateInput === "string" && /^\d+$/.test(dateInput)) {
    dateInput = Number(dateInput);
  }

  // Check for .NET ticks (> 1e14) or normal timestamps
  if (typeof dateInput === "number" && dateInput > 1e14) {
    date = fromDotNetTicks(dateInput);
  } else if (typeof dateInput === "number") {
    // Check if timestamp is in seconds (10 digits) or milliseconds
    date = new Date(dateInput.toString().length === 10 ? dateInput * 1000 : dateInput);
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) return "";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const finalOptions = { ...defaultOptions, ...options };
  return date.toLocaleString("en-US", finalOptions).replace(",", "");
};

// For just date (like Sep 10 2025)
export const formatDateOnly = (dateInput: string | number | Date) => {
  if (!dateInput) return "";

  let date: Date;

  if (typeof dateInput === "string" && /^\d+$/.test(dateInput)) {
    dateInput = Number(dateInput);
  }

  if (typeof dateInput === "number" && dateInput > 1e14) {
    date = fromDotNetTicks(dateInput);
  } else if (typeof dateInput === "number") {
    date = new Date(dateInput.toString().length === 10 ? dateInput * 1000 : dateInput);
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) return "";

  return `${date.toLocaleString("en-US", { month: "short" })} ${date.getDate()} ${date.getFullYear()}`;
};
