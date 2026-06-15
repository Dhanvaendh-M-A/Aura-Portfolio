import LiquidCursor from "@/components/LiquidCursor"
import FloatingOrbs from "@/components/FloatingOrbs"
import ScrollProgress from "@/components/ScrollProgress"
import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ProjectsSection from "@/components/ProjectsSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-aura-dark text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Background Effects */}
      <LiquidCursor />
      <FloatingOrbs />

      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
