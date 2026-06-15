"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { ExternalLink, Github, Eye, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Project {
  _id: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
}

const filterCategories = ["All", "Web App", "Mobile", "Design", "Backend"]

const sampleProjects: Project[] = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, AI recommendations, and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["Web App", "React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    _id: "2",
    title: "AI Dashboard",
    description: "Real-time analytics dashboard with machine learning insights, interactive charts, and predictive modeling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Web App", "Next.js", "Python", "TensorFlow"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    _id: "3",
    title: "Social Media App",
    description: "Mobile-first social platform with real-time messaging, stories, and content discovery algorithms.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    tags: ["Mobile", "React Native", "Firebase", "Redux"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    _id: "4",
    title: "Design System",
    description: "Comprehensive component library with accessibility features, theming, and documentation.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Design", "Figma", "Storybook", "CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    _id: "5",
    title: "API Gateway",
    description: "Microservices architecture with load balancing, rate limiting, and comprehensive monitoring.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    tags: ["Backend", "Go", "Docker", "Kubernetes"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    _id: "6",
    title: "Portfolio Generator",
    description: "AI-powered portfolio builder that creates stunning websites from simple prompts.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    tags: ["Web App", "OpenAI", "Next.js", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
  },
]

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>(sampleProjects)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch projects from API
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        if (data.success && data.data.length > 0) {
          setProjects(data.data)
        }
      } catch (error) {
        console.log("Using sample projects")
      }
    }
    fetchProjects()
  }, [])

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter))

  const featuredProjects = projects.filter((p) => p.featured)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-aura-secondary/10 text-aura-secondary border border-aura-secondary/20 mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A curated selection of projects that showcase my expertise in design,
            development, and problem-solving.
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        <div className="relative mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold font-display flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              Featured
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-[350px] md:w-[400px] snap-start"
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1000}
                  scale={1.02}
                >
                  <div
                    className="glass rounded-2xl overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-aura-dark via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-aura-primary/80 backdrop-blur-sm">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                      <p className="text-sm text-white/60 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-aura-primary to-aura-secondary text-white shadow-lg shadow-aura-primary/25"
                  : "glass text-white/60 hover:text-white"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  scale={1.02}
                  glareEnable={true}
                  glareMaxOpacity={0.2}
                  glareColor="#6366f1"
                >
                  <div className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-aura-primary/10 transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-aura-dark via-aura-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Hover Actions */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>

                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-2 group-hover:text-gradient transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-white/60 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/60 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="glass-strong rounded-3xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aura-dark via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold font-display mb-4">{selectedProject.title}</h3>
                <p className="text-white/70 mb-6">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm bg-aura-primary/10 text-aura-primary border border-aura-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 magnetic-btn text-center"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </span>
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
