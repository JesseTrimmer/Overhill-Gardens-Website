import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gardenPhoto from '../assets/homegarden.jpeg'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const stats = [
    { end: 500, suffix: '+', label: 'Native Species' },
    { end: 25,  suffix: '+', label: 'Years Growing' },
    { end: 0,   suffix: '',  label: 'Pesticides Used' },
  ]

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* HERO */}
      <div className="hero-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', minHeight: 'calc(100vh - 72px)', background: 'var(--cream)', gap: '2rem', padding: '0 2rem 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,6vw,5rem) clamp(0.5rem,3vw,2rem)' }}>
          <span className="eyebrow">East Tennessee Native Plant Nursery</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.2rem,6.5vw,6.2rem)',
            fontWeight: 300, lineHeight: 1.02, color: 'var(--charcoal)', marginBottom: '1.75rem',
            letterSpacing: '-0.01em',
          }}>
            Where your <em style={{ color: 'var(--moss)', fontStyle: 'italic' }}>natural garden</em> experience begins.
          </h1>
          <p style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.85, color: 'var(--text-muted)', maxWidth: '46ch', marginBottom: '2.5rem' }}>
            At Overhill Gardens of East Tennessee, our mission is to model and
            encourage beautiful and sustainable landscapes by providing high-quality,
            nursery-propagated native plants and design/build services for natural
            gardening and habitat development.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link className="btn-primary" to="/nursery">Explore the Nursery</Link>
            <Link className="btn-outline" to="/landscaping">Landscaping Services</Link>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'relative', overflow: 'hidden', minHeight: '520px', height: '100%',
            borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-strong)',
          }}>
            <img
              src={gardenPhoto}
              alt="Native garden in bloom"
              style={{
                width: '100%', height: '120%',
                objectFit: 'cover', objectPosition: 'center',
                transform: `translateY(${Math.min(scrollY * 0.12, 60)}px)`,
                transition: 'transform 0.1s linear',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(61,90,47,0.18), transparent 55%)' }} />
          </div>

          <div className="floating-stats" style={{
            position: 'absolute', left: '-1.5rem', bottom: '-1.5rem',
            background: 'var(--white)', borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-strong)', padding: '1.5rem 1.75rem',
            display: 'flex', gap: '2rem',
          }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: 'var(--moss)', lineHeight: 1 }}>
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.3rem', whiteSpace: 'nowrap' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTRO BAND */}
      <Reveal>
        <div style={{ margin: '0 2rem 3rem', background: 'var(--charcoal)', borderRadius: 'var(--radius-lg)', padding: '5rem clamp(2rem,8vw,8rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(143,170,122,0.15), transparent 70%)' }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.7rem,3.2vw,2.7rem)', fontWeight: 300, color: 'var(--cream)', maxWidth: '70ch', margin: '0 auto', lineHeight: 1.5, position: 'relative' }}>
            Whether we help choose the perfect plant for your garden or design and
            install your entire landscape, we believe that{' '}
            <em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>nurturing natural systems is an essential approach for our times.</em>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'rgba(245,240,232,0.5)', marginTop: '1.5rem', letterSpacing: '0.05em', position: 'relative' }}>
            We hope you'll join us in creating a legacy of sound stewardship!
          </p>
        </div>
      </Reveal>

      {/* TWO COLUMN CARDS */}
      <div className="home-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '0 2rem 3rem' }}>
        <Reveal direction="left">
          <Link
            to="/nursery"
            className="modern-card"
            style={{ display: 'block', background: 'var(--white)', padding: '3.5rem clamp(2rem,4vw,3.5rem)', position: 'relative', overflow: 'hidden' }}
          >
            <span className="eyebrow">Native Plant Nursery</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem,2.5vw,2.6rem)', fontWeight: 300, color: 'var(--charcoal)', marginBottom: '1.2rem', lineHeight: 1.15 }}>
              Seasoned growers of <em style={{ color: 'var(--moss)', fontStyle: 'italic' }}>fine native plants</em>
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '44ch' }}>
              One of the widest selections of native plants in the eastern U.S. —
              grown organically, locally, and with genuine care for genetic diversity.
            </p>
            <span style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)' }}>Browse Plants →</span>
          </Link>
        </Reveal>

        <Reveal direction="right">
          <Link
            to="/landscaping"
            className="modern-card"
            style={{ display: 'block', background: 'linear-gradient(150deg, var(--moss), var(--moss-dark))', padding: '3.5rem clamp(2rem,4vw,3.5rem)' }}
          >
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sage-light)', marginBottom: '0.75rem', display: 'block' }}>
              Landscaping Services
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem,2.5vw,2.6rem)', fontWeight: 300, color: 'var(--cream)', marginBottom: '1.2rem', lineHeight: 1.15 }}>
              Landscapes that <em style={{ color: 'var(--sage-light)', fontStyle: 'italic' }}>belong here</em>
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'rgba(245,240,232,0.75)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '44ch' }}>
              Custom design and installation using high-quality, locally grown native
              plants. From hardscapes in natural stone to restoration ecology.
            </p>
            <span style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage-light)' }}>View Services →</span>
          </Link>
        </Reveal>
      </div>

      {/* CONTACT BAND */}
      <Reveal>
        <div style={{ margin: '0 2rem 4rem', background: 'var(--parchment)', borderRadius: 'var(--radius-lg)', padding: '3rem 4vw', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.82rem', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
            Overhill Gardens · 1404 Citico Road · Vonore, TN 37885 &nbsp;·&nbsp;
            <strong>tel</strong> <a href="tel:4232952288" style={{ color: 'var(--moss)' }}>423.295.2288</a>
            &nbsp;·&nbsp;
            <strong>fax</strong> 423.295.2252 &nbsp;·&nbsp;
            <strong>mobile</strong> 423.295.5003
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <a href="mailto:avi@overhillgardens.com" style={{ color: 'var(--moss)' }}>avi@overhillgardens.com</a>
            &nbsp;·&nbsp;
            <Link to="/contact" style={{ color: 'var(--moss)', fontFamily: "'Jost',sans-serif", fontSize: '0.82rem' }}>Contact Us</Link>
          </p>
        </div>
      </Reveal>
    </div>
  )
}