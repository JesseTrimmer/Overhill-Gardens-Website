export default function HowToPurchase() {
  const methods = [
    {
      icon: '🌱',
      title: 'In Person',
      body: `Overhill Gardens sells direct to gardeners from our Vonore, TN nursery.
             Please call 423-295-2288 or email avi@overhillgardens.com to set up an
             appointment or come out during our regular business hours, 8–4,
             Monday through Saturday. During winter months we remain open but it's
             best to call ahead of time.`,
    },
    {
      icon: '📧',
      title: 'Order Ahead',
      body: `You can inquire online and we will email you a quote. Please send a
             request to eileen@overhillgardens.com or call 423-836-8242.`,
    },
    {
      icon: '🏪',
      title: 'Wholesale',
      body: `We offer wholesale pricing to the professional landscape trade, garden
             centers, public agencies and botanical gardens. Contact us for more
             information.`,
    },
    {
      icon: '🎁',
      title: 'Gift Cards (A Favorite!)',
      body: `Gift certificates may be purchased any time of the year. Please call
             or email avi@overhillgardens.com.`,
    },
    {
      icon: '🚚',
      title: 'Delivery',
      body: `We now deliver to Knoxville and Maryville throughout the week for a
             small fee. Contact eileen@overhillgardens.com or call 423-836-8242.`,
    },
  ]

  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">How to <em>Purchase</em></h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {methods.map((m, i) => (
          <div key={i} style={{
            display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
            padding: '1.75rem 0',
            borderBottom: i < methods.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              width: '48px', height: '48px', flexShrink: 0,
              background: 'var(--parchment)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
              border: '1px solid var(--border)',
            }}>
              {m.icon}
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.3rem', fontWeight: 400,
                color: 'var(--clay)', marginBottom: '0.5rem',
                fontStyle: 'italic',
              }}>{m.title}</h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                {m.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="divider" />

      <div style={{
        background: 'var(--parchment)',
        padding: '1.5rem',
        borderLeft: '3px solid var(--moss)',
        fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--text-muted)',
        fontStyle: 'italic',
      }}>
        <p>*As propagators we don't charge sales tax for any of our products.</p>
        <p style={{ marginTop: '0.5rem' }}>**We do not ship plants due to the delicate and sensitive nature of living plants.</p>
      </div>
    </div>
  )
}