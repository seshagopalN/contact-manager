import { create } from 'zustand'
import { SEED_CONTACTS } from './seed.js'

function loadInitial() {
  try {
    const raw = localStorage.getItem('contacts')
    if (raw) return JSON.parse(raw)
  } catch {}
  return SEED_CONTACTS
}

function persist(contacts) {
  try {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  } catch {}
}

function createId() {
  return Math.random().toString(36).slice(2, 9)
}

export const useContacts = create((set, get) => ({
  contacts: loadInitial(),

  addContact(contact) {
    const next = { id: createId(), ...contact }
    const contacts = [next, ...get().contacts]
    persist(contacts)
    set({ contacts })
    return next
  },

  updateContact(id, partial) {
    const contacts = get().contacts.map(c => c.id === id ? { ...c, ...partial } : c)
    persist(contacts)
    set({ contacts })
  },

  deleteContact(id) {
    const contacts = get().contacts.filter(c => c.id !== id)
    persist(contacts)
    set({ contacts })
  },

  setPhoto(id, dataUrl) {
    const contacts = get().contacts.map(c => c.id === id ? { ...c, photo: dataUrl } : c)
    persist(contacts)
    set({ contacts })
  },
}))


