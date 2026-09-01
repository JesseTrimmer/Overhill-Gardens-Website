import { useState, useMemo } from 'react'
import { useStaffAuth } from '../../context/StaffAuthContext'
import { getFileContent, commitBinaryFile, commitFile } from '../../lib/githubApi'
import { INVENTORY_PATH } from '../../config/github'

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function PlantPhotoUploader({ currentPlants, onUpdated }) {
  const { token } = useStaffAuth()
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const results = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return []
    return currentPlants
      .filter(p => `${p.commonName} ${p.scientificName}`.toLowerCase().includes(q))
      .slice(0, 8)
  }, [search, currentPlants])

  const selected = currentPlants.find(p => p.id === selectedId)

  const handlePickFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreviewUrl(URL.createObjectURL(f))
  }

  const handleUpload = async () => {
    if (!selected || !file) return
    setStatus('uploading')
    setMessage('')
    try {
      const ext = file.name.split('.').pop().toLowerCase()
      const photoPath = `overhill-gardens/public/plant-photos/${selected.id}.${ext}`
      const base64 = await fileToBase64(file)

      await commitBinaryFile({
        token,
        path: photoPath,
        base64Content: base64,
        message: `Add photo for ${selected.commonName}`,
      })

      const { content, sha } = await getFileContent({ token, path: INVENTORY_PATH })
      const plants = JSON.parse(content)
      const idx = plants.findIndex(p => p.id === selected.id)
      if (idx === -1) throw new Error('Could not find this plant in the live inventory file — try re-uploading the CSV first.')

      const publicUrl = `${import.meta.env.BASE_URL}plant-photos/${selected.id}.${ext}`
      plants[idx] = { ...plants[idx], photoUrl: publicUrl }

      await commitFile({
        token,
        path: INVENTORY_PATH,
        content: JSON.stringify(plants, null, 2),
        message: `Link photo for ${selected.commonName}`,
      })

      setStatus('done')
      setMessage(`Photo added for ${selected.commonName}! Live in 1–2 minutes.`)
      onUpdated?.(plants)
      setFile(null)
      setPreviewUrl(null)
      setSelectedId(null)
      setSearch('')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong uploading the photo.')
    }
  }

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', padding: '2rem', marginTop: '1.5rem' }}>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
        Add a Plant Photo
      </h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Search for a plant, attach one photo, and publish — no spreadsheet needed.
      </p>

      <input
        type="text"
        placeholder="Search plant name…"
        value={search}
        onChange={e => { setSearch(e.target.value); setSelectedId(null) }}
        style={{ width: '100%', padding: '0.65rem 1rem', background: 'var(--parchment)', border: '1px solid var(--border)', fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', outline: 'none', marginBottom: '0.5rem' }}
      />

      {!selected && results.length > 0 && (
        <div style={{ border: '1px solid var(--border)', marginBottom: '1rem' }}>
          {results.map(p => (
            <button
              key={p.id}
              onClick={() => { setSelectedId(p.id); setSearch(p.commonName) }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.6rem 1rem', fontSize: '0.85rem', borderBottom: '1px solid var(--border)' }}
            >
              {p.commonName} <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>— {p.scientificName}</span>
              {p.photoUrl && <span style={{ color: 'var(--moss)', fontSize: '0.75rem' }}> (has photo)</span>}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            Selected: <strong>{selected.commonName}</strong>
            {selected.photoUrl && <span style={{ color: 'var(--clay)' }}> — already has a photo, uploading will replace it</span>}
          </p>
          <input type="file" accept="image/*" onChange={handlePickFile} />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" style={{ display: 'block', maxWidth: '220px', marginTop: '1rem', border: '1px solid var(--border)' }} />
          )}
          {file && (
            <button className="btn-primary" onClick={handleUpload} disabled={status === 'uploading'} style={{ marginTop: '1rem' }}>
              {status === 'uploading' ? 'Uploading…' : 'Publish Photo'}
            </button>
          )}
        </div>
      )}

      {message && (
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: status === 'error' ? '#a03d2f' : 'var(--moss)' }}>
          {message}
        </p>
      )}
    </div>
  )
}