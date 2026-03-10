'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import { formatDate } from '@/lib/utils'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Education {
  id: number
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string | null
  description: string | null
}

export default function EducationPage() {
  const [items, setItems] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Education | null>(null)
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/education')
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (item?: Education) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        school: item.school,
        degree: item.degree,
        field: item.field,
        startDate: item.startDate.split('T')[0],
        endDate: item.endDate ? item.endDate.split('T')[0] : '',
        description: item.description || '',
      })
    } else {
      setEditingItem(null)
      setFormData({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '' })
    }
    setModalOpen(true)
  }

  const handleSave = async () => {
    const url = editingItem ? `/api/education/${editingItem.id}` : '/api/education'
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
      await fetch(`/api/education/${id}`, { method: 'DELETE' })
      fetchItems()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  if (loading) return <div className="text-gray-600">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Education</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{item.degree} in {item.field}</h3>
                <p className="text-gray-600">{item.school}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : 'Present'}
                </p>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Education' : 'Add Education'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
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