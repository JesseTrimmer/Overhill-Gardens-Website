import { useState, useMemo } from 'react'
import plantsData from '../../data/plants.json'
import StaffGate from '../../components/staff/StaffGate'
import InventoryUploader from '../../components/staff/InventoryUploader'
import PlantPhotoUploader from '../../components/staff/PlantPhotoUploader'

const selectStyle = {
  padding: '0.6rem 0.85rem', background: 'var(--white)', border: '1px solid var(--border)',
  fontFamily: "'Jost',sans-serif", fontSize: '0.82rem', color: 'var(--text)', outline: 'none',
}

const HEIGHT_BUCKETS = [
  { label: 'All Heights', test: () => true },
  { label: 'Under 1 ft', test: h => h != null && h < 1 },
  { label: '1–3 ft', test: h => h != null && h >= 1 && h < 3 },
  { label: '3–6 ft', test: h => h != null && h >= 3 && h < 6 },
  { label: '6 ft+', test: h => h != null && h >= 6 },
]

export default function BrowsePlants() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sun, setSun] = useState('All')
  const [moisture, setMoisture] = useState('All')
  const [bloomColor, setBloomColor] = useState('All')
  const [bloomTime, setBloomTime] = useState('All')
  const [heightBucket, setHeightBucket] = useState('All Heights')
  const [pollinatorOnly, setPollinatorOnly] = useState(false)
  const categories = useMemo(() => ['All', ...new Set(plantsData.map(p => p.category))].sort((a,b) => a==='All'?-1:a.localeCompare(b)), [])
  const sunOptions = useMemo(() => ['All', ...new Set(plantsData.map(p => p.sunNeeds).filter(Boolean))], [])
  const moistureOptions = useMemo(() => ['All', ...new Set(plantsData.map(p => p.moisture).filter(Boolean))], [])
  const bloomColorOptions = useMemo(() => ['All', ...new Set(plantsData.map(p => p.bloomColor).filter(Boolean))].sort((a,b) => a==='All'?-1:a.localeCompare(b)), [])
  const bloomTimeOptions = ['All', 'Spring', 'Summer', 'Fall', 'Winter']

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const bucket = HEIGHT_BUCKETS.find(b => b.label === heightBucket)
    return plantsData.filter(p => {
      if (q && !`${p.commonName} ${p.scientificName}`.toLowerCase().includes(q)) return false
      if (category !== 'All' && p.category !== category) return false
      if (sun !== 'All' && p.sunNeeds !== sun) return false
      if (moisture !== 'All' && p.moisture !== moisture) return false
      if (bloomColor !== 'All' && p.bloomColor !== bloomColor) return false
      if (bloomTime !== 'All' && !p.bloomTime?.includes(bloomTime)) return false
      if (bucket && !bucket.test(p.heightFt)) return false
      if (pollinatorOnly && !p.pollinatorFriendly) return false
      return true
    })
  }, [search, category, sun, moisture, bloomColor, bloomTime, heightBucket, pollinatorOnly])

  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">Browse Our <em>Plants</em></h2>

      <p className="section-body">
        We have one of the widest and most unique selections of native plants available
        in the eastern U.S. Search or filter below to find the right plant for your space.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', background: 'var(--parchment)', padding: '1.5rem', border: '1px solid var(--border)', margin: '2rem 0' }}>
        <input
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 200px', padding: '0.6rem 0.85rem', background: 'var(--white)', border: '1px solid var(--border)', fontFamily: "'Jost',sans-serif", fontSize: '0.85rem', outline: 'none' }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
          {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
        </select>
        <select value={sun} onChange={e => setSun(e.target.value)} style={selectStyle}>
          {sunOptions.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sun Needs' : s}</option>)}
        </select>
        <select value={moisture} onChange={e => setMoisture(e.target.value)} style={selectStyle}>
          {moistureOptions.map(m => <option key={m} value={m}>{m === 'All' ? 'All Moisture Levels' : m}</option>)}
        </select>
        <select value={heightBucket} onChange={e => setHeightBucket(e.target.value)} style={selectStyle}>
          {HEIGHT_BUCKETS.map(b => <option key={b.label} value={b.label}>{b.label}</option>)}
        </select>
        <select value={bloomColor} onChange={e => setBloomColor(e.target.value)} style={selectStyle}>
          {bloomColorOptions.map(c => <option key={c} value={c}>{c === 'All' ? 'All Bloom Colors' : c}</option>)}
        </select>
        <select value={bloomTime} onChange={e => setBloomTime(e.target.value)} style={selectStyle}>
          {bloomTimeOptions.map(t => <option key={t} value={t}>{t === 'All' ? 'All Bloom Times' : t}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <input type="checkbox" checked={pollinatorOnly} onChange={e => setPollinatorOnly(e.target.checked)} />
          Pollinator favorite
        </label>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Showing {filtered.length} of {plantsData.length} plants
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', padding: '1.25rem', borderLeft: p.inStock ? '3px solid var(--moss)' : '3px solid var(--border)' }}>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--clay)', marginBottom: '0.4rem' }}>{p.category}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: 'var(--charcoal)' }}>{p.commonName}</div>

            <div style={{
              width: '100%', aspectRatio: '16 / 9', overflow: 'hidden',
              background: p.photoUrl ? 'transparent' : 'var(--parchment)',
              margin: '0.6rem 0', border: '1px solid var(--border)',
            }}>
              {p.photoUrl ? (
                <img src={p.photoUrl} alt={p.commonName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  No photo yet
                </div>
              )}
            </div>

            <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>{p.scientificName}</div>

            {(p.sunNeeds || p.moisture || p.pollinatorFriendly) && (
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                {[p.sunNeeds, p.moisture, p.pollinatorFriendly ? 'Pollinator favorite' : null].filter(Boolean).join(' · ')}
              </div>
            )}

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {p.variants.map((v, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{v.size || 'Standard'}</span>
                  <span>{v.price != null ? `$${v.price.toFixed(2)}` : 'Call'}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!filtered.length && (
          <p style={{ gridColumn: '1 / -1', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No plants match your search — try clearing a filter.
          </p>
        )}
      </div>

      <div className="divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a href="https://overhillgardens.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.5rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderLeft: '3px solid var(--moss)', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.4rem' }}>📋</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: '0.92rem', color: 'var(--charcoal)' }}>2025 Native Plants retail price list</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>by <em>common name</em> (.pdf)</div>
          </div>
        </a>
        <a href="https://overhillgardens.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.5rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderLeft: '3px solid var(--moss)', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.4rem' }}>📋</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: '0.92rem', color: 'var(--charcoal)' }}>2025 Native Plants retail price list</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>by <em>scientific name</em> (.pdf)</div>
          </div>
        </a>
      </div>

      <div className="divider" />

      <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
        Staff Tools
      </h3>
      <StaffGate>
        <InventoryUploader currentPlants={plantsData} />
        <PlantPhotoUploader currentPlants={plantsData} />
      </StaffGate>
    </div>
  )
}