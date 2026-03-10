'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import { formatDate } from '@/lib/utils'
import { Plus, Pencil, Trash2, Upload, ExternalLink } from 'lucide-react'

interface Certificate {
  id: number
  title: string
  issuer: string
  date: string
  fileUrl: string | null
}

export default function CertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Certificate | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    fileUrl: '',
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/certificates')
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (item?: Certificate) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        issuer: item.issuer,
        date: item.date.split('T')[0],
        fileUrl: item.fileUrl || '',
      })
    } else {
      setEditingItem(null)
      setFormData({ title: '', issuer: '', date: '', fileUrl: '' })
    }
    setModalOpen(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('file', file)
      formDataObj.append('type', 'certificates')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataObj,
      })

      const data = await res.json()

      if (res.ok) {
        setFormData((prev) => ({ ...prev, fileUrl: data.url }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    const url = editingItem ? `/api/certificates/${editingItem.id}` : '/api/certificates'
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
      await fetch(`/api/certificates/${id}`, { method: 'DELETE' })
      fetchItems()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  if (loading) return <div className="text-gray-600">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.issuer}</p>
                <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                {item.fileUrl && (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:underline"
                  >
                    View Certificate <ExternalLink className="w-3 h-3" />
                  </a>
                )}
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Certificate' : 'Add Certificate'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certificate File</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </span>
              </label>
              {formData.fileUrl && (
                <span className="text-sm text-green-600">File uploaded</span>
              )}
            </div>
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