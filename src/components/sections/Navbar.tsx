import { Menu } from 'lucide-react'
import Link from 'next/link'

interface NavbarProps {
  isAdmin?: boolean
}

export function Navbar({ isAdmin }: NavbarProps) {
  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#languages', label: 'Languages' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-gray-900">
            CV
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                href="/admin"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Admin
              </Link>
            )}
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}