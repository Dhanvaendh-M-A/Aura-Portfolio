"use client"

import { motion } from "framer-motion"
import { Heart, ArrowUp, Github, Linkedin, Twitter, Dribbble } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/Dhanvaendh-M-A", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dhanvaendh-m-a-093238239", label: "LinkedIn" },
      { icon: Twitter, href: "https://twitter.com/Dhanvaendh_M_A", label: "Twitter" },
    { icon: Dribbble, href: "https://dribbble.com/dhanvaendh-m-a", label: "Dribbble" },
  ]

  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-2xl font-bold font-display text-gradient mb-2 block">
              AURA
            </Link>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-white/60 hover:text-white" />
                </motion.a>
              )
            })}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors group"
          >
            <ArrowUp className="w-5 h-5 text-white/60 group-hover:text-aura-primary transition-colors" />
          </motion.button>
        </div>

        {/* Made with love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 pt-8 border-t border-white/5"
        >
          <p className="text-sm text-white/40 flex items-center justify-center gap-1">
            Crafted with <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" /> using Next.js, MongoDB & Vercel
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
