// Minimal CSV parser — handles quoted fields and commas inside quotes, no dependency needed.
export function parseCSV(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i++ }
      else if (char === '"') { inQuotes = false }
      else { field += char }
    } else {
      if (char === '"') { inQuotes = true }
      else if (char === ',') { row.push(field); field = '' }
      else if (char === '\n' || char === '\r') {
        if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = '' }
        if (char === '\r' && next === '\n') i++
      } else {
        field += char
      }
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }

  const [header, ...dataRows] = rows
  return dataRows
    .filter(r => r.some(cell => cell.trim() !== ''))
    .map(r => {
      const obj = {}
      header.forEach((key, i) => { obj[key.trim()] = (r[i] ?? '').trim() })
      return obj
    })
}