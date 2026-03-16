'use client'

import { useEffect, useRef, useState } from 'react'
import { Profile } from '@prisma/client'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Send } from 'lucide-react'

interface ContactProps {
  profile: Profile
}

export function Contact({ profile }: ContactProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - you can integrate with your backend
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}`
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2520] via-[#3d2f28] to-[#2a2520]" />

      {/* Decorative Circular Pattern - Top Right */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none">
        <svg viewBox="0 0 500 500" className="w-full h-full opacity-[0.07]">
          <circle cx="250" cy="250" r="240" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="220" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="200" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="180" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="160" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="140" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="120" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="100" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="80" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="60" fill="none" stroke="#d4a574" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="40" fill="none" stroke="#d4a574" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Additional Background Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c77854]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#d4a574]/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Content */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Section Label */}
              <p className="text-[#d4a574] tracking-[0.3em] uppercase text-xs font-medium mb-6">
                Get In Touch
              </p>

              {/* Main Heading */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Let's Create Something Beautiful Together
              </h2>

              {/* Paragraph */}
              <p className="text-white/60 text-lg leading-relaxed mb-10 font-light max-w-md">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's connect and bring your ideas to life.
              </p>

              {/* Contact Details */}
              <div className="space-y-5 mb-10">
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors"
                  >
                    <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#d4a574]/20 group-hover:border-[#d4a574]/30 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-light">{profile.email}</span>
                  </a>
                )}

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors"
                  >
                    <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#d4a574]/20 group-hover:border-[#d4a574]/30 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-light">{profile.phone}</span>
                  </a>
                )}

                {profile.location && (
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-light">{profile.location}</span>
                  </div>
                )}
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-sm mr-2 font-light">Follow:</span>
                {[
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ibtissamdaif/' },
                  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/your-username' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/daif_ibtissam_/' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-[#d4a574]/40 hover:bg-[#d4a574]/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-white/50 text-sm mb-2 font-light">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-lg px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/[0.1] transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-white/50 text-sm mb-2 font-light">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-lg px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/[0.1] transition-all duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="subject" className="block text-white/50 text-sm mb-2 font-light">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-lg px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/[0.1] transition-all duration-300"
                      placeholder="Project Inquiry"
                      required
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label htmlFor="message" className="block text-white/50 text-sm mb-2 font-light">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-lg px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#d4a574]/50 focus:bg-white/[0.1] transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#d4a574] hover:bg-[#c4915a] text-[#2a2520] font-medium py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-[#d4a574]/20 mt-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}