export function getDateConsideringTimeZone(date, compressedFormat = false) {
  if (date) {
    const newDate = new Date(date);
    const dateDifferenceWithLocale = newDate.getTimezoneOffset();
    const result = new Date(newDate.getTime() + dateDifferenceWithLocale * 60000);
    if (compressedFormat) {
      return `${result.getMonth() + 1}/${result.getDate()}/${result.getFullYear()}`;
    }
    return result.toDateString();
  }
  return null;
}

export default {
  getDateConsideringTimeZone,
};
