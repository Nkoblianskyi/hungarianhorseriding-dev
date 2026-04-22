'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/tortenet', label: 'Történet' },
  { href: '/felszereles', label: 'Felszerelés' },
  { href: '/szabalyok', label: 'Szabályok' },
  { href: '/technika', label: 'Technika' },
  { href: '/blog', label: 'Blog' },
  { href: '/rolunk', label: 'Rólunk' },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const floating = !scrolled && !isOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          floating
            ? 'bg-transparent border-b border-transparent'
            : 'bg-[--cream]/96 backdrop-blur-sm border-b border-[--border]'
        )}
      >
        <div className="max-w-[1480px] mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-[72px] lg:h-[84px]">

            {/* Logo wordmark */}
            <Link
              href="/"
              aria-label="Hungarian Horse Riding — Főoldal"
              className="flex flex-col items-center gap-0 shrink-0 select-none group"
            >
              {/* Top micro-label */}
              <span
                className={cn(
                  'font-sans text-[7px] lg:text-[7.5px] tracking-[0.55em] uppercase font-medium leading-none mb-[5px] transition-colors duration-400',
                  floating ? 'text-white/50' : 'text-[--green-deep]/45'
                )}
              >
                Hungarian
              </span>

              {/* Gold divider line with diamond center */}
              <span className="relative flex items-center w-full mb-[5px]" aria-hidden="true">
                <span className={cn('flex-1 h-px transition-colors duration-400', floating ? 'bg-white/30' : 'bg-[--green-deep]/20')} />
                <span className="mx-[5px] w-[4px] h-[4px] rotate-45 bg-[--accent] flex-shrink-0" />
                <span className={cn('flex-1 h-px transition-colors duration-400', floating ? 'bg-white/30' : 'bg-[--green-deep]/20')} />
              </span>

              {/* Main wordmark — serif, large, elegant */}
              <span
                className={cn(
                  'font-serif font-light tracking-[0.18em] leading-none transition-colors duration-400',
                  'text-[18px] lg:text-[22px]',
                  floating ? 'text-white' : 'text-[--green-deep]'
                )}
              >
                Horse Riding
              </span>

              {/* Bottom gold rule */}
              <span
                className="mt-[6px] block h-px bg-[--accent] w-8 group-hover:w-full transition-all duration-500"
                aria-hidden="true"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-9" aria-label="Főmenü">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-colors duration-200 py-1',
                    'after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[--accent]',
                    'after:transition-all after:duration-300',
                    pathname === link.href
                      ? cn('after:w-full', floating ? 'text-white' : 'text-[--foreground]')
                      : cn(
                          'after:w-0 hover:after:w-full',
                          floating
                            ? 'text-white/55 hover:text-white'
                            : 'text-[--muted-foreground] hover:text-[--foreground]'
                        )
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9',
                floating ? 'text-white' : 'text-[--foreground]'
              )}
              aria-label={isOpen ? 'Menü bezárása' : 'Menü megnyitása'}
              aria-expanded={isOpen}
            >
              <span className={cn('block h-px bg-current transition-all duration-300 origin-center', isOpen ? 'w-5 rotate-45 translate-y-[9px]' : 'w-5')} />
              <span className={cn('block h-px bg-current transition-all duration-300', isOpen ? 'w-5 opacity-0' : 'w-4 ml-1')} />
              <span className={cn('block h-px bg-current transition-all duration-300 origin-center', isOpen ? 'w-5 -rotate-45 -translate-y-[9px]' : 'w-5')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[--green-deep] flex flex-col justify-end pb-20 px-8 transition-all duration-500',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobilmenü">
          {[{ href: '/', label: 'Főoldal' }, ...navLinks].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-serif text-[38px] font-light text-white/75 hover:text-white transition-colors duration-200 py-2 border-b border-white/10',
                pathname === link.href && 'text-[--accent]'
              )}
              style={{ transitionDelay: isOpen ? `${i * 45}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
