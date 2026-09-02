import { useState, useMemo } from 'react'
import eventsData from '../../data/events.json'
import StaffGate from '../../components/staff/StaffGate'
import EventManager from '../../components/staff/EventManager'
import EventRegistrationForm from '../../components/EventRegistrationForm'
import { getMonthGrid, toISODate, eventsOnDate, formatDisplayDate, MONTH_NAMES, WEEKDAY_LABELS } from '../../lib/dateUtils'

const CATEGORY_COLORS = {
  'Open House': 'var(--moss)',
  'Workshop': 'var(--clay)',
  'Sale': 'var(--bark)',
  'Class': 'var(--sage)',
  'Other': 'var(--text-muted)',
}

export default function CalendarEvents() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)

  const weeks = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth])
  const todayIso = toISODate(today)

  const goPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
    setSelectedDate(null)
  }
  const goNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
    setSelectedDate(null)
  }

  const upcoming = useMemo(() => {
    return [...eventsData]
      .filter(e => (e.endDate || e.date) >= todayIso)
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [todayIso])

  const displayedEvents = selectedDate
    ? eventsOnDate(eventsData, selectedDate)
    : upcoming

  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">Calendar of <em>Events</em></h2>
      <p className="section-body">
        Open houses, workshops, and plant sales throughout the season. Click any date to see
        what's happening, or browse upcoming events below.
      </p>

      <div style={{ border: '1px solid var(--border)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--moss)', padding: '0.85rem 1.25rem' }}>
          <button onClick={goPrevMonth} style={{ color: 'var(--cream)', fontSize: '1rem' }}>←</button>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: 'var(--cream)' }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button onClick={goNextMonth} style={{ color: 'var(--cream)', fontSize: '1rem' }}>→</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--border)', gap: '1px' }}>
          {WEEKDAY_LABELS.map(d => (
            <div key={d} style={{ background: 'var(--parchment)', padding: '0.5rem', textAlign: 'center', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              {d}
            </div>
          ))}
          {weeks.flat().map((date, i) => {
            if (!date) return <div key={i} style={{ background: 'var(--white)', minHeight: '64px' }} />
            const iso = toISODate(date)
            const dayEvents = eventsOnDate(eventsData, date)
            const isToday = iso === todayIso
            const isSelected = selectedDate && toISODate(selectedDate) === iso

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(isSelected ? null : date)}
                style={{
                  background: isSelected ? 'var(--parchment-dark)' : 'var(--white)',
                  minHeight: '64px', padding: '0.4rem', textAlign: 'left',
                  border: isToday ? '2px solid var(--moss)' : 'none',
                  cursor: dayEvents.length ? 'pointer' : 'default',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: isToday ? 'var(--moss)' : 'var(--charcoal)', fontWeight: isToday ? 600 : 400 }}>
                  {date.getDate()}
                </div>
                <div style={{ display: 'flex', gap: '3px', marginTop: '4px', flexWrap: 'wrap' }}>
                  {dayEvents.slice(0, 3).map(ev => (
                    <span key={ev.id} style={{ width: '6px', height: '6px', borderRadius: '50%', background: CATEGORY_COLORS[ev.category] || 'var(--moss)', display: 'inline-block' }} />
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            {selectedDate ? formatDisplayDate(toISODate(selectedDate)) : 'Upcoming Events'}
          </h3>
          {selectedDate && (
            <button onClick={() => setSelectedDate(null)} style={{ fontSize: '0.76rem', color: 'var(--moss)', textDecoration: 'underline' }}>
              Show all upcoming
            </button>
          )}
        </div>

        {displayedEvents.length === 0 && (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {selectedDate ? 'No events on this date.' : 'No upcoming events right now — check back soon!'}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {displayedEvents.map(ev => (
            <div key={ev.id} style={{ background: 'var(--white)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CATEGORY_COLORS[ev.category] || 'var(--moss)', display: 'inline-block' }} />
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--clay)' }}>{ev.category}</span>
              </div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '0.3rem' }}>{ev.title}</h4>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                {formatDisplayDate(ev.date)}{ev.endDate ? ` – ${formatDisplayDate(ev.endDate)}` : ''}
                {ev.time ? ` · ${ev.time}` : ''}
                {ev.location ? ` · ${ev.location}` : ' · Overhill Gardens Nursery'}
              </div>
              {ev.description && <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7 }}>{ev.description}</p>}
              <EventRegistrationForm event={ev} />
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
        Staff Tools
      </h3>
      <StaffGate>
        <EventManager currentEvents={eventsData} />
      </StaffGate>
    </div>
  )
}