export default function RestorationEcology() {
  return (
    <div>
      <span className="eyebrow">Landscaping Services</span>
      <h2 className="section-title">Restoration <em>Ecology</em></h2>

      <p className="section-body">
        One branch of our landscaping services is focused on restoration ecology.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 2rem' }}>
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80"
          alt="Restoration ecology"
          style={{ width: '100%', height: '240px', objectFit: 'cover' }}
        />
        <img
          src="https://images.unsplash.com/photo-1490750967868-88df5691cc0e?w=500&q=80"
          alt="Native habitat restoration"
          style={{ width: '100%', height: '240px', objectFit: 'cover' }}
        />
      </div>

      <p className="section-body">
        Using natives helps reduce the epidemic of exotic invasive plants that is
        destroying the integrity of so many of our natural communities. Not only are
        you helping support the local economy when you purchase plants from Overhill
        Gardens, but you know you are getting a product that is locally adapted.
      </p>
      <p className="section-body">
        Not only are our plants grown in the same climate as where they'll end up in
        your yard, much of our seed collection is local, too. This ensures
        well-adapted genetic stock — plants that evolved right here! And by growing
        many seedling species instead of cultivars, you know your plants will have
        more diverse gene pools which is good for the gardener and for the
        environment.
      </p>

      <div className="divider" />

      <div style={{
        background: 'var(--moss)', padding: '2rem',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem',
      }}>
        {[
          { stat: 'Invasive', label: 'Plant Removal' },
          { stat: 'Native',   label: 'Species Replanting' },
          { stat: 'Local',    label: 'Seed Stock' },
        ].map(item => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.8rem', fontWeight: 300,
              color: 'var(--sage-light)',
            }}>{item.stat}</div>
            <div style={{
              fontSize: '0.7rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)',
              marginTop: '0.3rem',
            }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}