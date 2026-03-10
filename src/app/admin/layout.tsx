import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Sidebar } from '@/components/admin/Sidebar'

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminLayout>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </AdminLayout>
  )
}