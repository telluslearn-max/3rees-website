"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Star, Truck, Shield, RotateCcw, MessageCircle } from "lucide-react";
import { products, trustStats, categories } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const testimonials = [
  {
    name: "James M.",
    location: "Nairobi",
    rating: 5,
    text: "Got an iPhone 14 Pro at 30% less than retail. Condition was exactly as described - Like New. Delivery was same day in CBD!",
    avatar: "JM",
  },
  {
    name: "Sarah K.",
    location: "Kiambu",
    rating: 5,
    text: "Traded in my old Samsung and got a great deal on the S24 Ultra. The BNPL option made it so easy. Highly recommend 3rees!",
    avatar: "SK",
  },
  {
    name: "Michael O.",
    location: "Mombasa",
    rating: 5,
    text: "Starlink kit arrived in 3 days as promised. Setup was straightforward and the speeds are incredible. Best purchase I've made this year.",
    avatar: "MO",
  },
];

export default function HomeContent() {
  const featuredProducts = products.slice(0, 6);
  const heroProduct = products[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-apple-gray-100 via-white to-apple-gray-100" />
        <div className="absolute inset-0 opacity-30">
          <Image
            src={heroProduct.image}
            alt="Hero background"
            fill
            className="object-cover blur-3xl scale-110"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="new" className="mb-6">Now with BNPL</Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-apple-dark tracking-tight leading-tight mb-6">
              Premium Devices.
              <br />
              <span className="text-apple-blue">Flexible Payments.</span>
            </h1>
            <p className="text-xl md:text-2xl text-apple-gray-200 max-w-2xl mx-auto mb-10">
              Certified refurbished iPhones, MacBooks, Samsung & Starlink in Kenya. 
              Trade-in your old device and save up to 30%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Shop Now
                </Button>
              </Link>
              <Link href="/trade-in">
                <Button variant="secondary" size="lg">
                  Check Trade-in Value
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 relative"
          >
            <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroProduct.image}
                alt="Featured product"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-apple-gray-200 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-apple-gray-200 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 bg-apple-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-apple-gray-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-apple-blue font-semibold uppercase tracking-wider text-sm mb-2">Featured</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-apple-dark">Trending Now</h2>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-apple-blue hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop">
              <Button variant="secondary">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* BNPL Promo */}
      <section className="py-24 bg-apple-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-apple-dark mb-4">
              Buy Now, Pay Later
            </h2>
            <p className="text-apple-gray-200 max-w-2xl mx-auto">
              Get your dream device today and pay in flexible monthly installments. 
              No credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Apple", deposit: "40%", months: "6 months", color: "bg-gray-900" },
              { name: "Samsung", deposit: "40%", months: "6 months", color: "bg-blue-600" },
              { name: "Vivo", deposit: "15-30%", months: "3 months", color: "bg-purple-600" },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${plan.color} rounded-xl flex items-center justify-center text-white font-bold mb-6`}>
                  {plan.name[0]}
                </div>
                <h3 className="text-xl font-semibold text-apple-dark mb-2">{plan.name} Financing</h3>
                <div className="space-y-2 text-apple-gray-200 mb-6">
                  <p>{plan.deposit} deposit</p>
                  <p>{plan.months}</p>
                  <p>Quick approval</p>
                </div>
                <Link href="/bnpl">
                  <Button variant="secondary" className="w-full">Learn More</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade-in CTA */}
      <section className="py-24 bg-apple-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-apple-blue to-purple-600" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
                Trade in your old device.
                <br />
                Get up to KSh 45,000.
              </h2>
              <p className="text-apple-gray-200 text-lg mb-8 max-w-lg">
                Instant quotes, free pickup, and immediate credit toward your new device. 
                It's never been easier to upgrade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trade-in">
                  <Button size="lg">Get Instant Quote</Button>
                </Link>
                <Link href="/shop">
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                    Browse Devices
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">45K</span>
                  </div>
                  <p className="text-white font-semibold">Max Trade-in Value</p>
                  <p className="text-apple-gray-200 text-sm">iPhone 14 Pro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-apple-dark text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/shop/${category.slug}`}>
                  <div className="group relative aspect-square rounded-2xl bg-apple-gray-100 overflow-hidden hover:shadow-lg transition-all">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <h3 className="font-semibold text-apple-dark group-hover:text-apple-blue transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-apple-gray-200 mt-1">{category.count} products</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-apple-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-apple-dark text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-apple-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-apple-blue text-white flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-apple-dark">{testimonial.name}</p>
                    <p className="text-sm text-apple-gray-200">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-apple-dark mb-6">
            Ready to upgrade?
          </h2>
          <p className="text-apple-gray-200 text-lg mb-8 max-w-2xl mx-auto">
            Join 15,000+ happy customers who trust 3rees for premium refurbished electronics in Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Shop Now
              </Button>
            </Link>
            <a
              href="https://wa.me/254XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg" leftIcon={<MessageCircle className="w-5 h-5" />}>
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t border-apple-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center gap-2 text-apple-gray-200">
              <Truck className="w-5 h-5" />
              <span className="text-sm">Free Delivery Nairobi</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-apple-gray-200">
              <Shield className="w-5 h-5" />
              <span className="text-sm">1 Year Warranty</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-apple-gray-200">
              <RotateCcw className="w-5 h-5" />
              <span className="text-sm">7-Day Returns</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-apple-gray-200">
              <Star className="w-5 h-5" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}