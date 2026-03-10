export default function TourNursery() {
  const photos = [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80',
    'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    'https://images.unsplash.com/photo-1490750967868-88df5691cc0e?w=400&q=80',
    'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?w=400&q=80',
    'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=400&q=80',
    'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=80',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80',
    'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=400&q=80',
  ]

  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">Tour the <em>Nursery</em></h2>
      <p className="section-body">
        Take a visual tour of Overhill Gardens. From our propagation greenhouses to
        the display gardens, you'll see native plants thriving at every stage — from
        seed to mature specimen.
      </p>
      <p className="section-body">
        <strong style={{ color: 'var(--moss)', fontWeight: 500 }}>Nursery Hours:</strong>{' '}
        Mon–Sat, 8am–4pm · March 15 – December 15{' '}
        <em>(open by appointment during the winter)</em>
      </p>
      <div className="divider" />
      <div className="photo-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {photos.map((src, i) => (
          <div key={i} className="photo-grid-item">
            <img src={src} alt={`Nursery tour ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}