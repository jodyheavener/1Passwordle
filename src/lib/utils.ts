export function daysSinceDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function datesEqual(date1: Date, date2: Date) {
  const date1String = `${date1.getFullYear()}-${
    date1.getMonth() + 1
  }-${date1.getDate()}`;
  const date2String = `${date2.getFullYear()}-${
    date2.getMonth() + 1
  }-${date2.getDate()}`;
  return date1String === date2String;
}

export function rightNow() {
  return new Date().getTime();
}
