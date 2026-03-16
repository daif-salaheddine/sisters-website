'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

interface NavbarProps {
  isAdmin?: boolean
}

export function Navbar({ isAdmin }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#languages', label: 'Languages' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream-200/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-2xl text-ink-900 tracking-wide hover:text-terracotta-500 transition-colors"
            >
              Ibtissam
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ink-700 hover:text-terracotta-500 transition-colors elegant-underline"
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-ink-700 hover:text-terracotta-500 transition-colors"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-ink-700 hover:text-terracotta-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink-900/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 bg-cream-100 shadow-2xl transform transition-transform duration-400 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-sand-300">
          <span className="font-serif text-xl text-ink-900">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-ink-600 hover:text-terracotta-500 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-6 py-8">
          <ul className="space-y-1">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-3 text-lg text-ink-700 hover:text-terracotta-500 hover:pl-2 transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  onClick={handleLinkClick}
                  className="block py-3 text-lg text-ink-700 hover:text-terracotta-500 hover:pl-2 transition-all duration-300"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Decorative Element */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mt-4 text-center text-sm text-ink-500 font-light">
            Crafted with elegance
          </p>
        </div>
      </div>
    </>
  )
}