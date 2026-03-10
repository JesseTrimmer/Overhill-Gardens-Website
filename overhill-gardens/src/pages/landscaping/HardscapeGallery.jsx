export default function HardscapeGallery() {
  const photos = [
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80',
    'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?w=500&q=80',
    'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=500&q=80',
    'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=500&q=80',
  ]

  return (
    <div>
      <span className="eyebrow">Landscaping Services</span>
      <h2 className="section-title">Hardscape <em>Gallery</em></h2>

      <p className="section-body">
        Using only natural stone (we don't use fabricated stones or pavers), we
        tackle major retaining jobs, paths, steps, stone walls and drainage ways,
        as well as outdoor features like patios, seatwalls and fireplaces.
      </p>

      <div className="photo-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)', margin: '2rem 0' }}>
        {photos.map((src, i) => (
          <div key={i} className="photo-grid-item">
            <img
              src={src}
              alt={`Hardscape ${i + 1}`}
              style={{ width: '100%', height: '220px', objectFit: 'cover', cursor: 'zoom-in' }}
            />
          </div>
        ))}
      </div>

      <div style={{
        background: 'var(--charcoal)',
        padding: '2rem',
        borderLeft: '3px solid var(--moss)',
      }}>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.75)', fontStyle: 'italic' }}>
          We use local stone from the Cumberland and/or Appalachian Mountains,
          which is mostly a sandstone/quartzite in grays to buffs. Regionally
          sourcing the material means less resources are used in transportation —
          and a landscape that truly belongs to this place.
        </p>
      </div>
    </div>
  )
}