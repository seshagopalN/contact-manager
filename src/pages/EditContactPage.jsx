import { useNavigate, useParams } from 'react-router-dom'
import { useContacts } from '../store/contacts.js'
import { useEffect, useRef, useState } from 'react'

export function EditContactPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { contacts, updateContact } = useContacts()
  const found = contacts.find(c => c.id === id)
  const [form, setForm] = useState(found || {})
  const fileRef = useRef(null)

  useEffect(() => { setForm(found || {}) }, [found])

  if (!found) return <div className="empty">Contact not found.</div>

  function submit(e) {
    e.preventDefault()
    updateContact(id, form)
    navigate(`/contacts/${id}`)
  }

  return (
    <div>
      <div className="page-header"><h2 className="page-title">Edit Contact</h2></div>
      <form onSubmit={submit} className="card">
        <div className="form-grid">
          <label className="full">
            <div className="section-title">Name</div>
            <input className="input" value={form.name||''} onChange={e=>setForm({...form, name:e.target.value})} />
          </label>
          <label className="full">
            <div className="section-title">Photo</div>
            <div className="row">
              <button type="button" className="btn" onClick={() => fileRef.current?.click()}>Upload</button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e)=>{
                const file = e.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = () => setForm(prev => ({ ...prev, photo: reader.result }))
                reader.readAsDataURL(file)
              }} />
              {form.photo ? <img src={form.photo} alt="preview" style={{ width: 48, height: 48, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }} /> : <span className="muted">No image</span>}
            </div>
          </label>
          <label>
            <div className="section-title">Email</div>
            <input className="input" value={form.email||''} onChange={e=>setForm({...form, email:e.target.value})} />
          </label>
          <label>
            <div className="section-title">Phone</div>
            <input className="input" value={form.phone||''} onChange={e=>setForm({...form, phone:e.target.value})} />
          </label>
          <label className="full">
            <div className="section-title">Company</div>
            <input className="input" value={form.company||''} onChange={e=>setForm({...form, company:e.target.value})} />
          </label>
          <label className="full">
            <div className="section-title">Address</div>
            <input className="input" value={form.address||''} onChange={e=>setForm({...form, address:e.target.value})} />
          </label>
          <label className="full">
            <div className="section-title">Notes</div>
            <textarea className="input" rows={4} value={form.notes||''} onChange={e=>setForm({...form, notes:e.target.value})} />
          </label>
        </div>
        <div className="toolbar" style={{ marginTop: 12 }}>
          <button className="btn" type="button" onClick={()=>navigate(-1)}>Cancel</button>
          <span className="spacer" />
          <button className="btn primary">Save Changes</button>
        </div>
      </form>
    </div>
  )
}


