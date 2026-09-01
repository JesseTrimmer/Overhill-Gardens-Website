import { categorize } from './categorize'

export const REQUIRED_COLUMNS = ['Latin Name', 'Common Name', 'Size', 'Price', 'Qty']
const VALID_SUN = ['Full Sun', 'Part Shade', 'Full Shade']
const VALID_MOISTURE = ['Dry', 'Medium', 'Wet']
const VALID_SEASONS = ['Spring', 'Summer', 'Fall', 'Winter']

function cleanEnum(value, validList) {
  const v = String(value ?? '').trim()
  const match = validList.find(opt => opt.toLowerCase() === v.toLowerCase())
  return match || ''
}

function cleanBloomTime(value) {
  const v = String(value ?? '')
  if (!v.trim()) return []
  return v.split(/[,;/]/).map(s => s.trim()).filter(Boolean)
    .map(s => VALID_SEASONS.find(season => season.toLowerCase() === s.toLowerCase()))
    .filter(Boolean)
}

export function processRows(rows, currentPlants) {
  if (!rows.length) return { error: 'No rows found in that file.' }

  const missing = REQUIRED_COLUMNS.filter(col => !(col in rows[0]))
  if (missing.length) {
    return { error: `Missing column(s): ${missing.join(', ')}. Check the template and try again.` }
  }

  const grouped = new Map()
  let skippedNotes = 0

  for (const r of rows) {
    const latin = String(r['Latin Name'] ?? '').trim()
    const common = String(r['Common Name'] ?? '').trim()
    const priceRaw = String(r['Price'] ?? '').trim()
    const qtyRaw = String(r['Qty'] ?? '').trim()
    const size = String(r['Size'] ?? '').trim() || null

    if (!latin && !common) continue
    if (!common && !priceRaw) { skippedNotes++; continue }

    const price = priceRaw && !isNaN(parseFloat(priceRaw)) ? Math.round(parseFloat(priceRaw) * 100) / 100 : null
    const qty = qtyRaw && !isNaN(parseInt(qtyRaw, 10)) ? parseInt(qtyRaw, 10) : 0

    const key = `${latin}|||${common}`
    if (!grouped.has(key)) {
      grouped.set(key, {
        scientificName: latin,
        commonName: common,
        category: categorize(latin, common),
        sunNeeds: '', moisture: '', heightFt: null, bloomColor: '', bloomTime: [],
        pollinatorFriendly: false, photoUrl: null, variants: [],
      })
    }

    const existing = grouped.get(key)
    if (!existing.sunNeeds) existing.sunNeeds = cleanEnum(r['Sun'], VALID_SUN)
    if (!existing.moisture) existing.moisture = cleanEnum(r['Moisture'], VALID_MOISTURE)
    if (existing.heightFt == null) {
      const h = String(r['Height (ft)'] ?? '').trim()
      if (h && !isNaN(parseFloat(h))) existing.heightFt = parseFloat(h)
    }
    if (!existing.bloomColor) existing.bloomColor = String(r['Bloom Color'] ?? '').trim()
    if (!existing.bloomTime.length) existing.bloomTime = cleanBloomTime(r['Bloom Time'])
    if (!existing.pollinatorFriendly) existing.pollinatorFriendly = /^(yes|true|1)$/i.test(String(r['Pollinator Friendly'] ?? '').trim())

    existing.variants.push({ size, price, qty })
  }

  for (const p of grouped.values()) {
    const match = currentPlants.find(cp => cp.scientificName === p.scientificName && cp.commonName === p.commonName)
    if (match?.photoUrl) p.photoUrl = match.photoUrl
  }

  const plants = Array.from(grouped.values()).map((p, i) => {
    const totalQty = p.variants.reduce((sum, v) => sum + v.qty, 0)
    const prices = p.variants.map(v => v.price).filter(v => v != null)
    return {
      id: `plant-${Date.now()}-${i}`,
      ...p,
      minPrice: prices.length ? Math.min(...prices) : null,
      maxPrice: prices.length ? Math.max(...prices) : null,
      totalQty,
      inStock: totalQty > 0,
    }
  })

  if (!plants.length) return { error: 'No valid plant rows found after processing. Check the file matches the template.' }

  return { plants, skippedNotes, totalRows: rows.length }
}