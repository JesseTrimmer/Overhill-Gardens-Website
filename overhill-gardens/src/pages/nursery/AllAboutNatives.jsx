export default function AllAboutNatives() {
  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">All About <em>Natives</em></h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <img
          src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80"
          alt="Native plants"
          style={{ width: '100%', height: '280px', objectFit: 'cover' }}
        />
        <img
          src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80"
          alt="Native garden"
          style={{ width: '100%', height: '280px', objectFit: 'cover' }}
        />
      </div>

      <p className="section-body">
        Landscaping with native plants improves the environment. Native plants are
        hardy because they have adapted to the local environment. Once established,
        native plants do not need pesticides, fertilizers, or watering. A native
        landscape does not need to be mowed like a conventional lawn, thus reducing
        the demand for non-renewable resources and improving water and air quality.
      </p>
      <p className="section-body">
        Landscaping with native wildflowers and grasses also helps sustain a healthy
        ecosystem. Native birds, butterflies and animals are attracted to their native
        plants, thus enhancing the biodiversity of the area. The beauty of native
        wildflowers and grasses creates a sense of place, both at home and work. The
        native plants increase our connection to nature, help educate our neighbors,
        and provide a beautiful, peaceful place to relax—<em>naturally</em>.
      </p>

      <div className="divider" />

      <p className="section-body">
        Using natives helps reduce the epidemic of exotic invasive plants that is
        destroying the integrity of so many of our natural communities. Not only are
        you helping support the local economy when you purchase plants from Overhill
        Gardens, but you know you are getting a product that is locally adapted. Not
        only are our plants grown in the same climate as where they'll end up in your
        yard, much of our seed collection is local, too.
      </p>
      <p className="section-body">
        This ensures well-adapted genetic stock — plants that evolved right here! And
        by growing many seedling species instead of cultivars, you know your plants
        will have more diverse gene pools which is good for the gardener and for the
        environment.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px',
        background: 'var(--border)', margin: '2.5rem 0',
      }}>
        {[
          { icon: '🦋', title: 'Wildlife Habitat', text: 'Attracts birds, butterflies, and native pollinators' },
          { icon: '💧', title: 'Water Conservation', text: 'No irrigation needed once established' },
          { icon: '🌱', title: 'No Chemicals', text: 'Naturally resistant to local pests and disease' },
        ].map(item => (
          <div key={item.title} style={{
            background: 'var(--parchment)', padding: '1.75rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
            <div style={{ fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--charcoal)' }}>{item.title}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}