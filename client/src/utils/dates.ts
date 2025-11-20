export const formatDateTime = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions,
  locale?: string | "en-US"
) => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};
