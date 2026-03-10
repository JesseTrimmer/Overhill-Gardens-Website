export default function CommercialPortfolio() {
  const photos = [
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80',
    'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=500&q=80',
  ]

  return (
    <div>
      <span className="eyebrow">Landscaping Services</span>
      <h2 className="section-title">Commercial Landscape <em>Portfolio</em></h2>

      <p className="section-body">
        A native landscape on commercial property is a great way to enhance the
        natural beauty of the landscape and breathe life into your business.
      </p>
      <p className="section-body">
        We have extensive experience designing and installing native plant landscapes
        for commercial properties — from office parks and medical facilities to
        municipalities and public spaces throughout East Tennessee.
      </p>

      <div className="photo-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', margin: '2rem 0' }}>
        {photos.map((src, i) => (
          <div key={i} className="photo-grid-item">
            <img
              src={src}
              alt={`Commercial project ${i + 1}`}
              style={{ width: '100%', height: '180px', objectFit: 'cover', cursor: 'zoom-in' }}
            />
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
        margin: '1rem 0',
      }}>
        {[
          { title: 'Office Parks',        icon: '🏢' },
          { title: 'Medical Facilities',  icon: '🏥' },
          { title: 'Public Spaces',       icon: '🌳' },
          { title: 'Botanical Gardens',   icon: '🌸' },
        ].map(item => (
          <div key={item.title} style={{
            background: 'var(--parchment)', padding: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            border: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--charcoal)' }}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}