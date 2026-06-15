"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@aura.dev",
      href: "mailto:hello@aura.dev",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
    },
  ]

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-aura-primary/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-aura-accent/10 text-aura-accent border border-aura-accent/20 mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Let&apos;s <span className="text-gradient">Collaborate</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s create something extraordinary together.
            I&apos;m always excited to work on new challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold font-display mb-8">Contact Information</h3>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-aura-primary/10 group-hover:bg-aura-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-aura-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">{info.label}</p>
                      <p className="font-medium group-hover:text-aura-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Availability Status */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-sm text-white/60">
                I&apos;m open to freelance projects, full-time positions, and collaboration opportunities.
                Typical response time: within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <motion.label
                    animate={{
                      y: focusedField === "name" || formData.name ? -24 : 0,
                      scale: focusedField === "name" || formData.name ? 0.85 : 1,
                      color: focusedField === "name" ? "#6366f1" : "rgba(255,255,255,0.6)",
                    }}
                    className="absolute left-4 top-4 origin-left pointer-events-none font-medium"
                  >
                    Your Name
                  </motion.label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 pt-6 pb-3 rounded-xl glass border border-white/10 focus:border-aura-primary/50 focus:outline-none focus:ring-2 focus:ring-aura-primary/20 transition-all bg-transparent"
                  />
                </div>

                <div className="relative">
                  <motion.label
                    animate={{
                      y: focusedField === "email" || formData.email ? -24 : 0,
                      scale: focusedField === "email" || formData.email ? 0.85 : 1,
                      color: focusedField === "email" ? "#6366f1" : "rgba(255,255,255,0.6)",
                    }}
                    className="absolute left-4 top-4 origin-left pointer-events-none font-medium"
                  >
                    Email Address
                  </motion.label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 pt-6 pb-3 rounded-xl glass border border-white/10 focus:border-aura-primary/50 focus:outline-none focus:ring-2 focus:ring-aura-primary/20 transition-all bg-transparent"
                  />
                </div>
              </div>

              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === "subject" || formData.subject ? -24 : 0,
                    scale: focusedField === "subject" || formData.subject ? 0.85 : 1,
                    color: focusedField === "subject" ? "#6366f1" : "rgba(255,255,255,0.6)",
                  }}
                  className="absolute left-4 top-4 origin-left pointer-events-none font-medium"
                >
                  Subject
                </motion.label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 pt-6 pb-3 rounded-xl glass border border-white/10 focus:border-aura-primary/50 focus:outline-none focus:ring-2 focus:ring-aura-primary/20 transition-all bg-transparent"
                />
              </div>

              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === "message" || formData.message ? -24 : 0,
                    scale: focusedField === "message" || formData.message ? 0.85 : 1,
                    color: focusedField === "message" ? "#6366f1" : "rgba(255,255,255,0.6)",
                  }}
                  className="absolute left-4 top-4 origin-left pointer-events-none font-medium"
                >
                  Your Message
                </motion.label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-4 pt-6 pb-3 rounded-xl glass border border-white/10 focus:border-aura-primary/50 focus:outline-none focus:ring-2 focus:ring-aura-primary/20 transition-all bg-transparent resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full magnetic-btn disabled:opacity-70 disabled:cursor-not-allowed ${
                  status === "success" ? "bg-green-500" : ""
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                  {status === "success" && <CheckCircle className="w-5 h-5" />}
                  {status === "error" && <AlertCircle className="w-5 h-5" />}
                  {status === "idle" && <Send className="w-5 h-5" />}
                  {status === "loading" && "Sending..."}
                  {status === "success" && "Message Sent!"}
                  {status === "error" && "Failed to Send"}
                  {status === "idle" && "Send Message"}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
