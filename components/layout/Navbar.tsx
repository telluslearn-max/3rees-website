"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { name: "Store", href: "/shop" },
  { name: "iPhone", href: "/shop/iphone" },
  { name: "Mac", href: "/shop/mac" },
  { name: "iPad", href: "/shop/ipad" },
  { name: "Gaming", href: "/shop/gaming" },
  { name: "Starlink", href: "/shop/starlink" },
  { name: "Trade In", href: "/trade-in" },
  { name: "Swap Library", href: "/swap-library" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-apple ${
          isScrolled 
            ? "glass border-b border-apple-gray-200/50" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold tracking-tight text-apple-dark">
                3rees
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs font-medium transition-colors duration-200 ${
                    pathname === item.href 
                      ? 'text-apple-dark font-semibold' 
                      : 'text-apple-gray-200 hover:text-apple-dark'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                aria-label="Search products"
                className="p-2 hover:bg-apple-gray rounded-full transition-colors duration-200"
              >
                <Search className="w-4 h-4 text-apple-dark" />
              </button>
              
              <button 
                onClick={() => setIsOpen(true)}
                aria-label="Shopping cart"
                className="p-2 hover:bg-apple-gray rounded-full transition-colors duration-200 relative"
              >
                <ShoppingBag className="w-4 h-4 text-apple-dark" />
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={totalItems}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-apple-blue text-white text-[10px] font-semibold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
              
              <button
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                className="lg:hidden p-2 hover:bg-apple-gray rounded-full transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5 text-apple-dark" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-apple-gray">
                  <span className="text-xl font-semibold text-apple-dark">3rees</span>
                  <button 
                    aria-label="Close menu"
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-2 hover:bg-apple-gray rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-apple-dark" />
                  </button>
                </div>
                
                <nav className="flex-1 overflow-auto py-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-6 py-4 text-lg font-medium transition-colors ${
                          pathname === item.href 
                            ? 'text-apple-blue bg-apple-gray' 
                            : 'text-apple-dark hover:bg-apple-gray'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                <div className="p-6 border-t border-apple-gray bg-apple-gray-100">
                  <p className="text-sm text-apple-gray-200">
                    Premium refurbished electronics in Kenya
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}