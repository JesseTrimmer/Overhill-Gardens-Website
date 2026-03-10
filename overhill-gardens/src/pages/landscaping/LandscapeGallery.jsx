export default function LandscapeGallery() {
  const photos = [
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

  return (
    <div>
      <span className="eyebrow">Landscaping Services</span>
      <h2 className="section-title">Landscape <em>Gallery</em></h2>
      <p className="section-body">
        Click on any image to expand the photo gallery. Each project showcases our
        approach to naturalistic, sustainable planting design using locally grown
        native plants.
      </p>

      <div className="photo-grid" style={{ margin: '2rem 0', gridTemplateColumns: 'repeat(3,1fr)' }}>
        {photos.map((src, i) => (
          <div key={i} className="photo-grid-item">
            <img
              src={src}
              alt={`Landscape project ${i + 1}`}
              style={{
                width: '100%', height: '180px', objectFit: 'cover',
                cursor: 'zoom-in',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}