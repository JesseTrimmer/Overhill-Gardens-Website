import { useState } from 'react'
import * as XLSX from 'xlsx'
import { useStaffAuth } from '../../context/StaffAuthContext'
import { parseCSV } from '../../lib/csv'
import { commitFile } from '../../lib/githubApi'
import { INVENTORY_PATH } from '../../config/github'
import { processRows } from '../../lib/inventoryProcessing'

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

    const ext = file.name.split('.').pop().toLowerCase()
    let rows

    try {
      if (ext === 'csv') {
        rows = parseCSV(await file.text())
      } else if (ext === 'xlsx' || ext === 'xls') {
        const buffer = await file.arrayBuffer()
        const workbook = XLSX.read(buffer, { type: 'array' })
        const firstSheetName = workbook.SheetNames.find(n => n.toLowerCase() !== 'instructions') || workbook.SheetNames[0]
        rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: '' })
      } else {
        setParseError('Please upload a .csv or .xlsx file.')
        return
      }
    } catch (err) {
      setParseError('Could not read that file. Make sure it\'s a valid CSV or Excel file.')
      return
    }

    const result = processRows(rows, currentPlants)
    if (result.error) { setParseError(result.error); return }
    setPreview(result)
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
        Upload your Excel file directly — no need to save as CSV first. Download the template
        below if you're starting fresh or need a reference for the columns and dropdown options.
      </p>

      
       <a href={`${import.meta.env.BASE_URL}templates/Overhill_Gardens_Inventory_Template.xlsx`}
        download
        style={{ display: 'inline-block', fontSize: '0.8rem', color: 'var(--moss)', textDecoration: 'underline', marginBottom: '1rem' }}
      >
        Download Excel template →
      </a>
      <br />

      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} />

      {parseError && <p style={{ color: '#a03d2f', fontSize: '0.85rem', marginTop: '1rem' }}>{parseError}</p>}

      {preview && (
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
            Found <strong>{preview.plants.length}</strong> plants from {preview.totalRows} rows
            {preview.skippedNotes > 0 ? ` (${preview.skippedNotes} note row${preview.skippedNotes > 1 ? 's' : ''} skipped)` : ''}.
            Currently live: <strong>{currentPlants.length}</strong>. Existing photos will be kept.
          </p>
          <div style={{ maxHeight: '260px', overflowY: 'auto', border: '1px solid var(--border)', marginBottom: '1rem' }}>
            <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--parchment)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Common Name</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Sun</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Moisture</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Bloom</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Pollinator</th>
                </tr>
              </thead>
              <tbody>
                {preview.plants.slice(0, 50).map(p => (
                  <tr key={p.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.5rem' }}>{p.commonName}</td>
                    <td style={{ padding: '0.5rem' }}>{p.sunNeeds || '—'}</td>
                    <td style={{ padding: '0.5rem' }}>{p.moisture || '—'}</td>
                    <td style={{ padding: '0.5rem' }}>{p.bloomColor || '—'}</td>
                    <td style={{ padding: '0.5rem' }}>{p.pollinatorFriendly ? 'Yes' : '—'}</td>
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