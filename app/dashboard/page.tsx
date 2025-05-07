"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Dashboard from "@/components/dashboard"
import Background from "@/components/background"
import { Brain, Shield, Clock, Users, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import "./page.css"

export default function DashboardPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const statsRef = useRef<HTMLElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/')
    }
  }, [isSignedIn, router])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  if (!isSignedIn) {
    return null
  }

  return (
    <main className="min-h-screen relative">
      <Background />
      <div className="relative container mx-auto dashboard-container">
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="rounded-full w-10 h-10 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>

        {/* Welcome Header */}
        <section className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Welcome to Your AI-Powered Dashboard
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Your personal hub for brain tumor detection and analysis. Upload scans, get instant results, and connect with experts.
          </p>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className={`dashboard-card stats-card ${statsVisible ? 'visible animation-delay-100' : ''} p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-blue-100 dark:border-blue-900`}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">95%</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Detection Accuracy</p>
              </div>
            </div>
          </Card>

          <Card className={`dashboard-card stats-card ${statsVisible ? 'visible animation-delay-200' : ''} p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-blue-100 dark:border-blue-900`}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">2 min</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Average Analysis Time</p>
              </div>
            </div>
          </Card>

          <Card className={`dashboard-card stats-card ${statsVisible ? 'visible animation-delay-300' : ''} p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-blue-100 dark:border-blue-900`}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">10k+</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Scans Analyzed</p>
              </div>
            </div>
          </Card>

          <Card className={`dashboard-card stats-card ${statsVisible ? 'visible animation-delay-400' : ''} p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-blue-100 dark:border-blue-900`}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">99.9%</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">System Uptime</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Main Dashboard */}
        <div className="dashboard-section">
          <Dashboard />
        </div>
      </div>
    </main>
  )
}