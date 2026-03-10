export default function BrowsePlants() {
  const plantPhotos = [
    'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=80',
    'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=80',
    'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
    'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=400&q=80',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80',
    'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=400&q=80',
    'https://images.unsplash.com/photo-1490750967868-88df5691cc0e?w=400&q=80',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80',
  ]

  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">Browse Our <em>Plants</em></h2>

      <div className="photo-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)', marginBottom: '2rem' }}>
        {plantPhotos.slice(0,2).map((src,i) => (
          <div key={i} className="photo-grid-item">
            <img src={src} alt={`Native plant ${i+1}`} style={{ width:'100%', height:'240px', objectFit:'cover' }} />
          </div>
        ))}
      </div>

      <p className="section-body">
        We have one of the widest and most unique selections of native plants available
        in the eastern U.S. — grown with the least amount of artificial inputs so they
        will maintain their innate vigor once planted in your yard.
      </p>
      <p className="section-body">
        We are always trying to bring overlooked, undiscovered and unusual native plant
        species into commerce. We grow over 500 species of native plants (not all are
        mentioned in our price list), some of which may not be available anywhere else.
        Having a diverse mix of plants helps keep pests and disease at a minimum, and as
        a result, we are able to rely on organic methods of agriculture to a great extent.
      </p>
      <p className="section-body" style={{ fontStyle: 'italic', fontSize: '0.88rem' }}>
        *Our plants may not be wholly devoid of blemishes like the plants you'll find at
        the big box stores, but rest assured they haven't been drenched — not even once —
        with dangerous chemicals.
      </p>

      <div className="divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a
          href="https://overhillgardens.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1.2rem 1.5rem',
            background: 'var(--parchment)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--moss)',
            textDecoration: 'none', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--parchment)'}
        >
          <span style={{ fontSize: '1.4rem' }}>📋</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: '0.92rem', color: 'var(--charcoal)' }}>
              2025 Native Plants retail price list
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              by <em>common name</em> (.pdf)
            </div>
          </div>
        </a>
        <a
          href="https://overhillgardens.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1.2rem 1.5rem',
            background: 'var(--parchment)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--moss)',
            textDecoration: 'none', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--parchment)'}
        >
          <span style={{ fontSize: '1.4rem' }}>📋</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: '0.92rem', color: 'var(--charcoal)' }}>
              2025 Native Plants retail price list
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              by <em>scientific name</em> (.pdf)
            </div>
          </div>
        </a>
      </div>

      <div className="divider" />
      <div className="photo-grid">
        {plantPhotos.slice(2).map((src,i) => (
          <div key={i} className="photo-grid-item">
            <img src={src} alt={`Native plant ${i+3}`} />
          </div>
        ))}
      </div>
    </div>
  )
}