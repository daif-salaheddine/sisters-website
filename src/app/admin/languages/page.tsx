'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Language {
  id: number
  name: string
  level: string
}

const levels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']

export default function LanguagesPage() {
  const [items, setItems] = useState<Language[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Language | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    level: 'Intermediate',
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/languages')
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (item?: Language) => {
    if (item) {
      setEditingItem(item)
      setFormData({ name: item.name, level: item.level })
    } else {
      setEditingItem(null)
      setFormData({ name: '', level: 'Intermediate' })
    }
    setModalOpen(true)
  }

  const handleSave = async () => {
    const url = editingItem ? `/api/languages/${editingItem.id}` : '/api/languages'
    const method = editingItem ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setModalOpen(false)
        fetchItems()
      }
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return

    try {
      await fetch(`/api/languages/${id}`, { method: 'DELETE' })
      fetchItems()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  if (loading) return <div className="text-gray-600">Loading...</div>

  const levelColors: Record<string, string> = {
    Native: 'bg-green-100 text-green-800',
    Fluent: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Basic: 'bg-gray-100 text-gray-800',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Languages</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Language
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${levelColors[item.level]}`}>
                  {item.level}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(item)} className="p-2 text-gray-400 hover:text-gray-600">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Language' : 'Add Language'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}