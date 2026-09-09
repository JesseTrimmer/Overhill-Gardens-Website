import { useState } from 'react'

const RESIDENTIAL_PHOTOS = [
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&q=80',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500&q=80',
  'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?w=500&q=80',
  'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&q=80',
  'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=500&q=80',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80',
  'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=500&q=80',
  'https://images.unsplash.com/photo-1490750967868-88df5691cc0e?w=500&q=80',
  'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=500&q=80',
]

const COMMERCIAL_PHOTOS = [
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80',
  'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=500&q=80',
]

const COMMERCIAL_TYPES = [
  { title: 'Office Parks', icon: '🏢' },
  { title: 'Medical Facilities', icon: '🏥' },
  { title: 'Public Spaces', icon: '🌳' },
  { title: 'Botanical Gardens', icon: '🌸' },
]

export default function LandscapeGallery() {
  const [tab, setTab] = useState('residential')
  const photos = tab === 'residential' ? RESIDENTIAL_PHOTOS : COMMERCIAL_PHOTOS

  return (
    <div>
      <span className="eyebrow">Landscaping Services</span>
      <h2 className="section-title">Project <em>Gallery</em></h2>
      <p className="section-body">
        From backyard native plantings to large-scale commercial installations, every
        project showcases our approach to naturalistic, sustainable planting design
        using locally grown native plants.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setTab('residential')}
          className={tab === 'residential' ? 'btn-primary' : 'btn-outline'}
          style={{ fontSize: '0.72rem' }}
        >Residential</button>
        <button
          onClick={() => setTab('commercial')}
          className={tab === 'commercial' ? 'btn-primary' : 'btn-outline'}
          style={{ fontSize: '0.72rem' }}
        >Commercial</button>
      </div>

      <div className="photo-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {photos.map((src, i) => (
          <div key={i} className="photo-grid-item">
            <img src={src} alt={`${tab} project ${i + 1}`} style={{ width: '100%', height: '180px', objectFit: 'cover', cursor: 'zoom-in' }} />
          </div>
        ))}
      </div>

      {tab === 'commercial' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0 1rem' }}>
          {COMMERCIAL_TYPES.map(item => (
            <div key={item.title} style={{ background: 'var(--parchment)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--charcoal)' }}>{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}