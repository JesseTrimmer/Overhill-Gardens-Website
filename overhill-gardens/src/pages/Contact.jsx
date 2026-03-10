import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="fade-up" style={{ paddingTop: '72px' }}>
      {/* Header */}
      <div style={{
        background: 'var(--parchment)',
        padding: '2.5rem 4vw',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem',
            fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--clay)',
          }}>Get in Touch</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300,
            color: 'var(--charcoal)', marginTop: '0.4rem',
          }}>Contact Us</h1>
        </div>
      </div>

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '3.5rem 2rem 5rem',
        display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5vw',
      }}>
        {/* Info */}
        <div>
          <div style={{
            background: 'var(--white)', padding: '2.5rem',
            border: '1px solid var(--border)',
            marginBottom: '2rem',
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.8rem', fontWeight: 300,
              color: 'var(--charcoal)', marginBottom: '2rem',
            }}>Overhill <em style={{ color: 'var(--moss)' }}>Gardens</em></h2>

            {[
              { label: 'Address', value: '1404 Citico Road\nVonore, TN (Tennessee) 37885' },
              { label: 'Hours', value: 'Mon–Sat 8am–4pm\nMar 15 – Dec 15\n(open by appointment during the winter)' },
              { label: 'Telephone', value: '423.295.2288' },
              { label: 'Fax', value: '423.295.2252' },
              { label: 'Mobile', value: '423.295.5003' },
              { label: 'Email', value: 'avi@overhillgardens.com' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr',
                gap: '1rem', marginBottom: '1.2rem',
                paddingBottom: '1.2rem',
                borderBottom: '1px solid var(--border)',
              }}>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--clay)', paddingTop: '0.15rem',
                }}>{item.label}</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.1rem', fontWeight: 300,
                  color: 'var(--charcoal)', whiteSpace: 'pre-line', lineHeight: 1.6,
                }}>
                  {item.label === 'Email'
                    ? <a href={`mailto:${item.value}`} style={{ color: 'var(--moss)' }}>{item.value}</a>
                    : item.label === 'Telephone'
                    ? <a href={`tel:${item.value.replace(/\./g,'')}`} style={{ color: 'var(--charcoal)' }}>{item.value}</a>
                    : item.value
                  }
                </span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'var(--moss)', padding: '1.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontSize: '0.68rem', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--sage-light)', marginBottom: '0.25rem',
              }}>Directions</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--cream)' }}>
                Native Plant Nursery and Eco-friendly Landscapes
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=1404+Citico+Road+Vonore+TN"
              target="_blank" rel="noreferrer"
              style={{
                fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--cream)',
                border: '1px solid rgba(245,240,232,0.4)',
                padding: '0.6rem 1.2rem', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,240,232,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Google Maps →
            </a>
          </div>
        </div>

        {/* Form */}
        <div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.6rem', fontWeight: 300,
            color: 'var(--charcoal)', marginBottom: '2rem',
          }}>Send us a <em style={{ color: 'var(--moss)' }}>message</em></h3>

          {submitted ? (
            <div style={{
              background: 'var(--parchment)', padding: '2.5rem',
              border: '1px solid var(--border)', textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', color: 'var(--charcoal)' }}>
                Thank you for reaching out!
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                We'll get back to you as soon as we can.
              </p>
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
            >
              {[
                { id: 'name',  label: 'Full Name *', type: 'text',  required: true },
                { id: 'email', label: 'Email *',      type: 'email', required: true },
                { id: 'phone', label: 'Phone',         type: 'tel',   required: false },
              ].map(field => (
                <div key={field.id}>
                  <label style={{
                    display: 'block', fontSize: '0.68rem', fontWeight: 500,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', marginBottom: '0.5rem',
                  }}>{field.label}</label>
                  <input
                    type={field.type} required={field.required}
                    style={{
                      width: '100%', padding: '0.75rem 1rem',
                      background: 'var(--white)', border: '1px solid var(--border)',
                      fontFamily: "'Jost',sans-serif", fontSize: '0.9rem',
                      color: 'var(--text)', outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--moss)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              ))}

              <div>
                <label style={{
                  display: 'block', fontSize: '0.68rem', fontWeight: 500,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', marginBottom: '0.5rem',
                }}>I'm interested in</label>
                <select style={{
                  width: '100%', padding: '0.75rem 1rem',
                  background: 'var(--white)', border: '1px solid var(--border)',
                  fontFamily: "'Jost',sans-serif", fontSize: '0.9rem',
                  color: 'var(--text)', outline: 'none',
                }}>
                  <option>Purchasing Plants</option>
                  <option>Landscape Design</option>
                  <option>Hardscape Construction</option>
                  <option>Restoration Ecology</option>
                  <option>Commercial Landscaping</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block', fontSize: '0.68rem', fontWeight: 500,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', marginBottom: '0.5rem',
                }}>Message</label>
                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  style={{
                    width: '100%', padding: '0.75rem 1rem',
                    background: 'var(--white)', border: '1px solid var(--border)',
                    fontFamily: "'Jost',sans-serif", fontSize: '0.9rem',
                    color: 'var(--text)', outline: 'none', resize: 'vertical',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--moss)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.9rem 2.5rem' }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}