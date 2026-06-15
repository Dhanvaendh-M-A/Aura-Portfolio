import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap"
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk",
  display: "swap"
})

export const metadata: Metadata = {
  title: "AURA | Creative Developer Portfolio",
  description: "A next-generation portfolio showcasing innovative web experiences with cutting-edge technologies",
  keywords: ["portfolio", "developer", "react", "nextjs", "mongodb", "fullstack"],
  authors: [{ name: "AURA Developer" }],
  openGraph: {
    title: "AURA | Creative Developer Portfolio",
    description: "Next-generation portfolio with stunning interactive experiences",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
