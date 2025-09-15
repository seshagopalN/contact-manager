import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { ContactsPage } from './pages/ContactsPage.jsx'
import { ContactDetailPage } from './pages/ContactDetailPage.jsx'
import { EditContactPage } from './pages/EditContactPage.jsx'
import { NewContactPage } from './pages/NewContactPage.jsx'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" replace />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/contacts/new" element={<NewContactPage />} />
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
          <Route path="/contacts/:id/edit" element={<EditContactPage />} />
          <Route path="*" element={<div className="empty">Not Found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
