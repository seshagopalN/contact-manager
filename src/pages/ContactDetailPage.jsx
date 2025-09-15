import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContacts } from '../store/contacts.js'
import { useMemo } from 'react'

export function ContactDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { contacts, deleteContact } = useContacts()
  const contact = useMemo(() => contacts.find(c => c.id === id), [contacts, id])

  if (!contact) {
    return <div className="empty">Contact not found.</div>
  }

  return (
    <div className="detail">
      <div className="panel">
        {contact.photo ? (
          <img src={contact.photo} alt={contact.name} className="avatar" style={{ width: 80, height: 80, borderRadius: 20, objectFit: 'cover' }} />
        ) : (
          <div className="avatar" style={{ width: 80, height: 80, borderRadius: 20, fontSize: 22 }}>{(contact.name||'?').slice(0,2).toUpperCase()}</div>
        )}
        <h2 style={{ marginBottom: 6 }}>{contact.name || 'Unnamed'}</h2>
        <div className="muted">{contact.company || '—'}</div>
      </div>
      <div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="row"><span className="section-title">Email</span>{contact.email || '—'}</div>
          <div className="row"><span className="section-title">Phone</span>{contact.phone || '—'}</div>
          <div className="row"><span className="section-title">Address</span>{contact.address || '—'}</div>
          <div className="row"><span className="section-title">Notes</span>{contact.notes || '—'}</div>
        </div>
        <div className="toolbar">
          <Link className="btn" to={`/contacts/${id}/edit`}>Edit</Link>
          <button className="btn danger" onClick={() => { if (confirm('Delete this contact?')) { deleteContact(id); navigate('/contacts') } }}>Delete</button>
        </div>
      </div>
    </div>
  )
}


