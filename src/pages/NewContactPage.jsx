import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useContacts } from '../store/contacts.js'

export function NewContactPage() {
  const navigate = useNavigate()
  const { addContact } = useContacts()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', address: '', notes: '', photo: '' })
  const fileRef = useRef(null)

  function submit(e) {
    e.preventDefault()
    const created = addContact(form)
    navigate(`/contacts/${created.id}`)
  }

  return (
    <div>
      <div className="page-header"><h2 className="page-title">New Contact</h2></div>
      <form onSubmit={submit} className="card">
        <div className="form-grid">
          <label className="full">
            <div className="section-title">Name</div>
            <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
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
            <input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          </label>
          <label>
            <div className="section-title">Phone</div>
            <input className="input" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
          </label>
          <label className="full">
            <div className="section-title">Company</div>
            <input className="input" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} />
          </label>
          <label className="full">
            <div className="section-title">Address</div>
            <input className="input" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
          </label>
          <label className="full">
            <div className="section-title">Notes</div>
            <textarea className="input" rows={4} value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
          </label>
        </div>
        <div className="toolbar" style={{ marginTop: 12 }}>
          <button className="btn" type="button" onClick={()=>navigate(-1)}>Cancel</button>
          <span className="spacer" />
          <button className="btn primary">Create Contact</button>
        </div>
      </form>
    </div>
  )
}


