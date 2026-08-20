export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('en-US').format(new Date(value));
}