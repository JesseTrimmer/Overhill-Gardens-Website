export default function DesignApproach() {
  const planPhotos = [
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80',
    'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?w=400&q=80',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80',
    'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80',
  ]

  return (
    <div>
      <span className="eyebrow">Landscaping Services</span>
      <h2 className="section-title">Design <em>Approach</em></h2>

      <p className="section-body">
        Our design approach has been informed to a large extent by observations of
        design in nature. We take clues from mother nature in the way plants are
        combined, the sequencing of bloom that is so eloquently orchestrated along
        our rural roads, and the random placement of trees and shrubs, not so easy
        to pull off in man-made gardens. We have a bold, stylized approach that often
        involves large massings of individual species — an artistic exaggeration of
        what we find so appealing in nature.
      </p>

      <div className="photo-grid" style={{ margin: '2rem 0' }}>
        {planPhotos.map((src, i) => (
          <div key={i} className="photo-grid-item">
            <img src={src} alt={`Design example ${i + 1}`} />
          </div>
        ))}
      </div>

      <p className="section-body">
        The details of your landscape are worked out in the design phase, where
        exciting ideas are generated, plantings are envisioned, and the outdoor
        rooms are devised to be fluid, functional and inviting. We'll map out the
        details on paper and then refine them to your specifications. We strive to
        make your experience both enjoyable and educational.
      </p>
      <p className="section-body">
        We are well-versed in working within budgets. We will also provide you with
        detailed maintenance instructions and will be available for maintenance work
        for the life of your garden — just because these plants persist remarkably
        well in nature doesn't mean you can just plant and then forget about them.
      </p>

      <div className="divider" />

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
        background: 'var(--border)',
      }}>
        {[
          { title: 'Nature-Informed',    text: 'Design clues taken directly from East Tennessee\'s natural landscape patterns' },
          { title: 'Bold Plantings',     text: 'Large massings of individual species create dramatic seasonal impact' },
          { title: 'Detailed Planning',  text: 'Full plan drawings refined to your specifications and budget' },
          { title: 'Ongoing Support',    text: 'Maintenance instructions and continued care for the life of your garden' },
        ].map(item => (
          <div key={item.title} style={{
            background: 'var(--parchment)', padding: '1.5rem',
          }}>
            <div style={{
              fontWeight: 500, fontSize: '0.82rem',
              letterSpacing: '0.05em', color: 'var(--moss)',
              marginBottom: '0.4rem', textTransform: 'uppercase',
            }}>{item.title}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}