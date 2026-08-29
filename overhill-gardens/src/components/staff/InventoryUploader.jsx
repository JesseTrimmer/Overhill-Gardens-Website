import { useState } from 'react'
import { useStaffAuth } from '../../context/StaffAuthContext'
import { parseCSV } from '../../lib/csv'
import { commitFile } from '../../lib/githubApi'
import { INVENTORY_PATH } from '../../config/github'
import { categorize } from '../../lib/categorize'

const REQUIRED_COLUMNS = ['Latin Name', 'Common Name', 'Size', 'Price', 'Qty']

export default function InventoryUploader({ currentPlants, onUploaded }) {
  const { token } = useStaffAuth()
  const [preview, setPreview] = useState(null)
  const [parseError, setParseError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setParseError(null)
    setPreview(null)

    const rows = parseCSV(await file.text())
    if (!rows.length) { setParseError('No rows found in that file.'); return }

    const missing = REQUIRED_COLUMNS.filter(col => !(col in rows[0]))
    if (missing.length) {
      setParseError(`Missing column(s): ${missing.join(', ')}. Check the template and try again.`)
      return
    }

    const grouped = new Map()
    let skippedNotes = 0

    for (const r of rows) {
      const latin = (r['Latin Name'] || '').trim()
      const common = (r['Common Name'] || '').trim()
      const priceRaw = (r['Price'] || '').trim()
      const qtyRaw = (r['Qty'] || '').trim()
      const size = (r['Size'] || '').trim() || null

      if (!latin && !common) continue
      if (!common && !priceRaw) { skippedNotes++; continue } // cross-reference note row

      const price = priceRaw && !isNaN(parseFloat(priceRaw)) ? Math.round(parseFloat(priceRaw) * 100) / 100 : null
      const qty = qtyRaw && !isNaN(parseInt(qtyRaw, 10)) ? parseInt(qtyRaw, 10) : 0

      const key = `${latin}|||${common}`
      if (!grouped.has(key)) {
        grouped.set(key, {
          scientificName: latin,
          commonName: common,
          category: categorize(latin, common),
          variants: [],
        })
      }
      grouped.get(key).variants.push({ size, price, qty })
    }

    const result = Array.from(grouped.values()).map((p, i) => {
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

    if (!result.length) {
      setParseError('No valid plant rows found after processing. Check the file matches the template.')
      return
    }

    setPreview({ plants: result, skippedNotes, totalRows: rows.length })
  }

  const handleConfirm = async () => {
    if (!preview) return
    setStatus('uploading')
    setStatusMessage('')
    try {
      await commitFile({
        token,
        path: INVENTORY_PATH,
        content: JSON.stringify(preview.plants, null, 2),
        message: `Update plant inventory (${preview.plants.length} plants)`,
      })
      setStatus('done')
      setStatusMessage('Uploaded! The live site will update in 1–2 minutes once GitHub Pages rebuilds.')
      onUploaded?.(preview.plants)
    } catch (err) {
      setStatus('error')
      setStatusMessage(err.message || 'Something went wrong committing the file.')
    }
  }

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', padding: '2rem' }}>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
        Upload Inventory Spreadsheet
      </h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Export your inventory spreadsheet as a CSV — same columns you already use: Latin Name,
        Common Name, Size, Price, Qty. Multiple size rows for the same plant are combined
        automatically. This replaces the entire inventory list.
      </p>

      
       <a href={`${import.meta.env.BASE_URL}templates/plant-inventory-template.csv`}
        download
        style={{ display: 'inline-block', fontSize: '0.8rem', color: 'var(--moss)', textDecoration: 'underline', marginBottom: '1rem' }}
      >
        Download CSV template →
      </a>
      <br />

      <input type="file" accept=".csv" onChange={handleFile} />

      {parseError && <p style={{ color: '#a03d2f', fontSize: '0.85rem', marginTop: '1rem' }}>{parseError}</p>}

      {preview && (
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
            Found <strong>{preview.plants.length}</strong> plants from {preview.totalRows} rows
            {preview.skippedNotes > 0 ? ` (${preview.skippedNotes} note/reference row${preview.skippedNotes > 1 ? 's' : ''} skipped)` : ''}.
            Currently live: <strong>{currentPlants.length}</strong>.
          </p>
          <div style={{ maxHeight: '260px', overflowY: 'auto', border: '1px solid var(--border)', marginBottom: '1rem' }}>
            <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--parchment)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Common Name</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Sizes</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Total Qty</th>
                </tr>
              </thead>
              <tbody>
                {preview.plants.slice(0, 50).map(p => (
                  <tr key={p.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.5rem' }}>{p.commonName}</td>
                    <td style={{ padding: '0.5rem' }}>{p.category}</td>
                    <td style={{ padding: '0.5rem' }}>{p.variants.length}</td>
                    <td style={{ padding: '0.5rem' }}>{p.totalQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-primary" onClick={handleConfirm} disabled={status === 'uploading'}>
            {status === 'uploading' ? 'Uploading…' : 'Confirm & Publish'}
          </button>
        </div>
      )}

      {statusMessage && (
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: status === 'error' ? '#a03d2f' : 'var(--moss)' }}>
          {statusMessage}
        </p>
      )}
    </div>
  )
}