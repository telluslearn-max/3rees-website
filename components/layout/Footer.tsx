'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Aurora Pro', href: '/product/aurora-pro' },
    { name: 'Crystal Edition', href: '/product/crystal' },
    { name: 'Accessories', href: '/shop/accessories' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Warranty', href: '/warranty' },
    { name: 'Returns', href: '/returns' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]
}

export function Footer() {
  return (
    <footer className="relative bg-neutral-950 border-t border-white/10">
      {/* Glass blur effect at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">3rees</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Transparent technology for the modern visionary.
            </p>
            
            {/* Social placeholders */}
            <div className="mt-6 flex gap-3">
              {['twitter', 'instagram', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href={`https://${social}.com`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2025 3rees. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/30 text-sm">
            <span>Made with precision</span>
            <div className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}