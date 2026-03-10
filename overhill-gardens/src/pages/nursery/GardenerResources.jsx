export default function GardenerResources() {
  const links = [
    { url: 'https://wildflower.org',              label: 'wildflower.org',              desc: 'Lady Bird Johnson Wildflower Center' },
    { url: 'https://grownative.org',              label: 'grownative.org',              desc: 'Grow Native! Program' },
    { url: 'https://for-wild.org',                label: 'for-wild.org',                desc: 'North American Native Plant Society' },
    { url: 'https://tva.gov/river',               label: 'tva.org/river',               desc: 'Tennessee Valley Authority – River' },
    { url: 'https://plants.usda.gov',             label: 'plants.usda.gov',             desc: 'USDA Plants Database' },
    { url: 'https://tenn.bio.utk.edu',            label: 'tenn.bio.utk.edu',            desc: 'University of Tennessee Herbarium' },
    { url: 'https://tneppc.org',                  label: 'tneppc.org',                  desc: 'TN Exotic Pest Plant Council' },
    { url: 'https://gardeningwithnativeplants.com', label: 'gardeningwithnativeplants.com', desc: 'Gardening with Native Plants' },
    { url: 'https://tnps.org',                    label: 'tnps.org',                    desc: 'Tennessee Native Plant Society' },
  ]

  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">Natural Gardening <em>Resources</em></h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
        <img
          src="https://images.unsplash.com/photo-1490750967868-88df5691cc0e?w=300&q=80"
          alt="Native garden resources"
          style={{ width: '130px', height: '130px', objectFit: 'cover', flexShrink: 0 }}
        />
        <p className="section-body" style={{ margin: 0 }}>
          We hope you find this page helpful. Please send any feedback you may have
          to{' '}
          <a href="mailto:avi@overhillgardens.com" style={{ color: 'var(--moss)' }}>
            avi@overhillgardens.com
          </a>
        </p>
      </div>

      <div className="divider" />

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
          fontFamily: "'Jost', sans-serif", fontSize: '0.72rem',
          fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
          marginBottom: '1rem',
        }}>Plant Hardiness Zones / Heat Index Map</h3>
        <a
          href="https://planthardiness.ars.usda.gov"
          target="_blank" rel="noreferrer"
          className="btn-outline"
          style={{ fontSize: '0.72rem' }}
        >
          View USDA Zone Map
        </a>
      </div>

      <div className="divider" />

      <h3 style={{
        fontFamily: "'Jost', sans-serif", fontSize: '0.72rem',
        fontWeight: 500, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'var(--text-muted)',
        marginBottom: '1.2rem',
      }}>Web Links</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank" rel="noreferrer"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.9rem 1rem',
              background: i % 2 === 0 ? 'var(--parchment)' : 'var(--white)',
              borderLeft: '2px solid transparent',
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderLeftColor = 'var(--moss)'
              e.currentTarget.style.background = 'var(--parchment-dark)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderLeftColor = 'transparent'
              e.currentTarget.style.background = i % 2 === 0 ? 'var(--parchment)' : 'var(--white)'
            }}
          >
            <span style={{ fontSize: '0.88rem', color: 'var(--moss)', fontWeight: 500 }}>
              {link.label}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {link.desc}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}