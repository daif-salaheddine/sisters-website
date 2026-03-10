'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Wrench,
  LogOut,
  Home,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/languages', label: 'Languages', icon: Globe },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">CV Admin</h1>
        <p className="text-gray-400 text-sm">Manage your portfolio</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg mb-2"
        >
          <Home className="w-5 h-5" />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-2 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}