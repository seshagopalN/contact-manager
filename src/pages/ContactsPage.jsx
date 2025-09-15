import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useContacts } from '../store/contacts.js'

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase())
    .join('') || '?'
}

export function ContactsPage() {
  const { contacts } = useContacts()
  const { search } = useLocation()
  const q = new URLSearchParams(search).get('q')?.toLowerCase() || ''

  const filtered = useMemo(() => {
    if (!q) return contacts
    return contacts.filter(c =>
      [c.name, c.email, c.phone, c.company]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q))
    )
  }, [contacts, q])

  const palette = ['#1f2937', '#4f46e5', '#16a34a', '#dc2626', '#9333ea', '#0ea5e9', '#f59e0b', '#059669', '#7c3aed', '#db2777']
  function colorFor(id) {
    let hash = 0
    const s = String(id || '')
    for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0
    return palette[hash % palette.length]
  }
  function hexToRgb(hex) {
    const h = hex.replace('#','')
    const m = h.length === 3 ? h.split('').map(ch => ch + ch).join('') : h
    const num = parseInt(m, 16)
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
  }
  function isLight(hex) {
    const { r, g, b } = hexToRgb(hex)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 160
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Contacts</h2>
        <span className="muted">{filtered.length} total</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">No contacts found.</div>
      ) : (
        <div className="grid">
          {filtered.map(c => {
            const bg = colorFor(c.id)
            const text = isLight(bg) ? '#0b1220' : '#ffffff'
            const meta = isLight(bg) ? 'rgba(11,18,32,0.7)' : 'rgba(255,255,255,0.8)'
            return (
              <Link
                key={c.id}
                to={`/contacts/${c.id}`}
                className="card contact-card"
                style={{ background: bg, borderColor: 'transparent', color: text }}
              >
              {c.photo ? (
                <img src={c.photo} alt={c.name} className="avatar" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="avatar" style={{ background: isLight(bg) ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.12)', color: text }}>
                  {initials(c.name || c.email || 'U')}
                </div>
              )}
              <div>
                <div className="contact-name" style={{ color: text }}>{c.name || 'Unnamed'}</div>
                <div className="contact-meta" style={{ color: meta }}>{c.email || 'no email'} • {c.phone || 'no phone'}</div>
              </div>
              <div className="muted">›</div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}


