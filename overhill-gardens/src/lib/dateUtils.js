export function toISODate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export function eventsOnDate(events, date) {
  const iso = toISODate(date)
  return events.filter(e => {
    const start = e.date
    const end = e.endDate || e.date
    return iso >= start && iso <= end
  })
}

export function formatDisplayDate(isoString) {
  const [y, m, d] = isoString.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
export const WEEKDAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']