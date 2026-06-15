"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { Code2, Palette, Zap, Globe, Database, Terminal, Cpu, Layers } from "lucide-react"

const skills = [
  { name: "React / Next.js", level: 95, icon: Code2, color: "#61DAFB" },
  { name: "TypeScript", level: 90, icon: Terminal, color: "#3178C6" },
  { name: "Node.js", level: 88, icon: Cpu, color: "#339933" },
  { name: "MongoDB", level: 85, icon: Database, color: "#47A248" },
  { name: "UI/UX Design", level: 92, icon: Palette, color: "#F24E1E" },
  { name: "Three.js / WebGL", level: 80, icon: Layers, color: "#000000" },
  { name: "Tailwind CSS", level: 95, icon: Zap, color: "#06B6D4" },
  { name: "AWS / Cloud", level: 75, icon: Globe, color: "#FF9900" },
]

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-aura-primary/10 text-aura-primary border border-aura-primary/20 mb-4"
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Passionate About{" "}
            <span className="text-gradient">Creating</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            I transform complex problems into elegant, user-friendly digital solutions.
            Every pixel matters, every interaction counts.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
              >
                <div className="glass rounded-2xl p-6 text-center gradient-border">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
                    className="text-4xl md:text-5xl font-bold text-gradient block mb-2"
                  >
                    {stat.number}
                  </motion.span>
                  <span className="text-sm text-white/60">{stat.label}</span>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Skills List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display mb-8">Technical Skills</h3>
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${skill.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: skill.color }} />
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-white/60">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full relative"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={2000}
              scale={1.05}
              transitionSpeed={3000}
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareColor="#6366f1"
              glarePosition="all"
            >
              <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-50">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-aura-primary via-aura-secondary to-aura-accent animate-gradient-x" />
                </div>

                <div className="relative z-10">
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-aura-primary to-aura-secondary animate-spin-slow" />
                    <div className="absolute inset-1 rounded-full bg-aura-dark flex items-center justify-center">
                      <span className="text-4xl font-bold text-gradient">JD</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-center mb-2">John Doe</h3>
                  <p className="text-center text-white/60 mb-6">Full Stack Developer</p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/70"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
