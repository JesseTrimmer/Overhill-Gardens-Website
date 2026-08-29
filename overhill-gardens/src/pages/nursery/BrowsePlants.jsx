import { useState, useMemo } from 'react'
import plantsData from '../../data/plants.json'
import StaffGate from '../../components/staff/StaffGate'
import InventoryUploader from '../../components/staff/InventoryUploader'

const selectStyle = {
  padding: '0.65rem 1rem', background: 'var(--white)', border: '1px solid var(--border)',
  fontFamily: "'Jost',sans-serif", fontSize: '0.85rem', color: 'var(--text)', outline: 'none',
}

function formatPriceRange(p) {
  if (p.minPrice == null) return 'Call for price'
  if (p.minPrice === p.maxPrice) return `$${p.minPrice.toFixed(2)}`
  return `$${p.minPrice.toFixed(2)} – $${p.maxPrice.toFixed(2)}`
}

export default function BrowsePlants() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [inStockOnly, setInStockOnly] = useState(false)

  const categories = useMemo(
    () => ['All', ...new Set(plantsData.map(p => p.category))].sort((a, b) => a === 'All' ? -1 : a.localeCompare(b)),
    []
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return plantsData.filter(p => {
      if (q && !`${p.commonName} ${p.scientificName}`.toLowerCase().includes(q)) return false
      if (category !== 'All' && p.category !== category) return false
      if (inStockOnly && !p.inStock) return false
      return true
    })
  }, [search, category, inStockOnly])

  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">Browse Our <em>Plants</em></h2>

      <p className="section-body">
        We have one of the widest and most unique selections of native plants available
        in the eastern U.S. — grown with the least amount of artificial inputs so they
        will maintain their innate vigor once planted in your yard. Search or filter
        below to see what we're currently growing.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', background: 'var(--parchment)', padding: '1.5rem', border: '1px solid var(--border)', margin: '2rem 0' }}>
        <input
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 220px', padding: '0.65rem 1rem', background: 'var(--white)', border: '1px solid var(--border)', fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', outline: 'none' }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
          {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} />
          In stock only
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
            <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{p.scientificName}</div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              {p.variants.map((v, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{v.size || 'Standard'}</span>
                  <span>{v.price != null ? `$${v.price.toFixed(2)}` : 'Call'}{v.qty > 0 ? '' : ' · Out of stock'}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.6rem' }}>
              <span style={{ fontWeight: 500, color: 'var(--moss)' }}>{formatPriceRange(p)}</span>
              <span style={{ fontSize: '0.72rem', color: p.inStock ? 'var(--moss)' : 'var(--text-muted)' }}>
                {p.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
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
        <a href="https://overhillgardens.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.5rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderLeft: '3px solid var(--moss)', textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--parchment)'}
        >
          <span style={{ fontSize: '1.4rem' }}>📋</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: '0.92rem', color: 'var(--charcoal)' }}>2025 Native Plants retail price list</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>by <em>common name</em> (.pdf)</div>
          </div>
        </a>
        <a href="https://overhillgardens.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.5rem', background: 'var(--parchment)', border: '1px solid var(--border)', borderLeft: '3px solid var(--moss)', textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--parchment)'}
        >
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
      </StaffGate>
    </div>
  )
}