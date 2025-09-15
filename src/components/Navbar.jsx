import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const usp = new URLSearchParams(location.search)
    setQuery(usp.get('q') || '')
  }, [location.search])

  function onSearchSubmit(e) {
    e.preventDefault()
    const path = location.pathname.startsWith('/contacts') ? '/contacts' : '/'
    const usp = new URLSearchParams(location.search)
    if (query) usp.set('q', query)
    else usp.delete('q')
    navigate(`${path}?${usp.toString()}`)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="btn ghost" type="button" onClick={() => navigate(-1)}>← Back</button>
        <Link to="/" className="brand">
          <span className="brand-badge">CM</span>
          Contact Manager
        </Link>
        <form className="searchbar" onSubmit={onSearchSubmit} role="search">
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contacts..."
            aria-label="Search contacts"
          />
          <button className="btn" type="submit">Search</button>
        </form>
        <span className="spacer" />
        <Link to="/contacts/new" className="btn primary">New Contact</Link>
      </div>
    </header>
  )
}


