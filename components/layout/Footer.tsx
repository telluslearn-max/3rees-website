"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

const footerLinks = {
  Shop: ["iPhone", "Mac", "iPad", "Samsung", "Gaming", "Starlink", "Accessories"],
  Services: ["Trade In", "Swap Library", "BNPL", "Business", "Repairs"],
  Support: ["Contact Us", "Delivery Info", "Returns", "Warranty", "FAQ"],
  Company: ["About Us", "Careers", "Press", "Sustainability", "Blog"]
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href={`/${link.toLowerCase().replace(/ /g, "-")}/`} className="text-sm text-gray-600 hover:text-black transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-gray-200 mb-8">
          <div className="mb-4 md:mb-0">
            <h4 className="font-semibold mb-1">Questions? Chat with us.</h4>
            <p className="text-sm text-gray-600">WhatsApp response within minutes</p>
          </div>
          <a 
            href="https://wa.me/254XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2024 3rees. All rights reserved.</span>
            <Link href="/privacy/" className="hover:text-black">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-black">Terms of Use</Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Made with care in Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}