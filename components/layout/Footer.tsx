"use client";

import Link from "next/link";
import { MessageCircle, Instagram, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  Shop: [
    { name: "iPhone", href: "/shop/iphone" },
    { name: "Mac", href: "/shop/mac" },
    { name: "iPad", href: "/shop/ipad" },
    { name: "Samsung", href: "/shop/samsung" },
    { name: "Gaming", href: "/shop/gaming" },
    { name: "Starlink", href: "/shop/starlink" },
    { name: "Accessories", href: "/shop/accessories" },
  ],
  Services: [
    { name: "Trade In", href: "/trade-in" },
    { name: "Swap Library", href: "/swap-library" },
    { name: "BNPL", href: "/bnpl" },
    { name: "Business", href: "/business" },
    { name: "Repairs", href: "/repairs" },
  ],
  Support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Delivery Info", href: "/delivery" },
    { name: "Returns", href: "/returns" },
    { name: "Warranty", href: "/warranty" },
    { name: "FAQ", href: "/faq" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Blog", href: "/blog" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-apple-gray-100 border-t border-apple-gray">
      <div className="apple-container py-16">
        {/* Newsletter */}
        <div className="mb-12 pb-12 border-b border-apple-gray">
          <h3 className="apple-eyebrow">Stay in the loop</h3>
          <p className="text-apple-gray-300 mb-4 max-w-md">
            Get exclusive deals and new arrival alerts delivered to your inbox.
          </p>
          <form className="flex gap-3 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-apple-gray-200 bg-white focus:border-apple-blue focus:outline-none transition-colors text-sm"
            />
            <button type="submit" className="apple-button whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-apple-dark uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-apple-gray-200 hover:text-apple-dark transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-apple-gray mb-8 gap-6">
          <div>
            <h4 className="font-semibold text-apple-dark mb-1">Questions? Chat with us.</h4>
            <p className="text-sm text-apple-gray-200">WhatsApp response within minutes</p>
          </div>
          <a
            href="https://wa.me/254XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-apple-gray">
          <span className="text-xs text-apple-gray-200">Secure payments:</span>
          <div className="flex gap-3">
            <div className="h-8 px-3 bg-green-600 rounded-md flex items-center text-white text-xs font-bold">
              M-PESA
            </div>
            <div className="h-8 px-3 bg-white border border-apple-gray rounded-md flex items-center text-apple-dark text-xs font-bold">
              VISA
            </div>
            <div className="h-8 px-3 bg-white border border-apple-gray rounded-md flex items-center text-apple-dark text-xs font-bold">
              Mastercard
            </div>
            <div className="h-8 px-3 bg-apple-blue rounded-md flex items-center text-white text-xs font-bold">
              COD
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-apple-gray-200">
            <span>© 2024 3rees. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-apple-dark transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-apple-dark transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="hover:text-apple-dark transition-colors">Sitemap</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="p-2 hover:bg-apple-gray rounded-full transition-colors text-apple-gray-300 hover:text-apple-dark">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 hover:bg-apple-gray rounded-full transition-colors text-apple-gray-300 hover:text-apple-dark">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 hover:bg-apple-gray rounded-full transition-colors text-apple-gray-300 hover:text-apple-dark">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <span className="text-xs text-apple-gray-200">Made with care in Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}