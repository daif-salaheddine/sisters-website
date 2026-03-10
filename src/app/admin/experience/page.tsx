'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import { formatDate } from '@/lib/utils'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  order: number
}

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Experience | null>(null)
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/experience')
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (item?: Experience) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        company: item.company,
        position: item.position,
        startDate: item.startDate.split('T')[0],
        endDate: item.endDate ? item.endDate.split('T')[0] : '',
        current: item.current,
        description: item.description,
      })
    } else {
      setEditingItem(null)
      setFormData({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' })
    }
    setModalOpen(true)
  }

  const handleSave = async () => {
    const url = editingItem ? `/api/experience/${editingItem.id}` : '/api/experience'
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
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      await fetch(`/api/experience/${id}`, { method: 'DELETE' })
      fetchItems()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  if (loading) return <div className="text-gray-600">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Experience</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{item.position}</h3>
                <p className="text-gray-600">{item.company}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Experience' : 'Add Experience'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Currently working here</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-y"
            />
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