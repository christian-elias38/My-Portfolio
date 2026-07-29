type DateLike = Date | string | number

function toYear(value: DateLike): number {
  return typeof value === 'number' ? value : new Date(value).getFullYear()
}

export function formatDate(value: DateLike): string {
  return new Date(value).toLocaleDateString()
}

export function formatYearRange(start: DateLike, end?: DateLike | null): string {
  return `${toYear(start)} — ${end ? toYear(end) : 'Present'}`
}
