import luxon from 'luxon';

export function formatDate(date: string): string {
  return luxon.DateTime.fromISO(date).toLocaleString(luxon.DateTime.DATE_SHORT);
}
