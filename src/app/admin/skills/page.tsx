'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Skill {
  id: number
  name: string
  level: number
  category: string
}

const categories = ['technical', 'soft', 'tools']

export default function SkillsPage() {
  const [items, setItems] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    level: 80,
    category: 'technical',
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/skills')
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (item?: Skill) => {
    if (item) {
      setEditingItem(item)
      setFormData({ name: item.name, level: item.level, category: item.category })
    } else {
      setEditingItem(null)
      setFormData({ name: '', level: 80, category: 'technical' })
    }
    setModalOpen(true)
  }

  const handleSave = async () => {
    const url = editingItem ? `/api/skills/${editingItem.id}` : '/api/skills'
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
      await fetch(`/api/skills/${id}`, { method: 'DELETE' })
      fetchItems()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  if (loading) return <div className="text-gray-600">Loading...</div>

  const groupedItems = categories.reduce((acc, cat) => {
    acc[cat] = items.filter((item) => item.category === cat)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 capitalize">{category} Skills</h2>
          <div className="space-y-3">
            {groupedItems[category]?.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{item.level}%</span>
                    <button onClick={() => handleOpenModal(item)} className="p-1 text-gray-400 hover:text-gray-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1 text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <ProgressBar value={item.level} />
              </div>
            ))}
            {groupedItems[category]?.length === 0 && (
              <p className="text-gray-500 text-sm">No skills in this category</p>
            )}
          </div>
        </div>
      ))}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Skill' : 'Add Skill'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level: {formData.level}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
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