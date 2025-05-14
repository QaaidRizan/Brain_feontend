"use client"

import { useUser, UserButton, SignInButton, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Dashboard from "@/components/dashboard"
import Background from "@/components/background"
import { Brain, Shield, Clock, Users, CheckCircle2, Sun, Moon, LogOut } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import "./page.css"

export default function DashboardPage() {
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const statsRef = useRef<HTMLElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/')
    } else {
      // Scroll to top when component mounts
      window.scrollTo({ top: 0, behavior: 'smooth' })
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

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden" ref={mainRef}>
      <Background />
      <div className="relative container mx-auto dashboard-container pt-20">
        {/* Header with Theme Toggle and User Menu */}
        <div className="fixed top-4 right-4 flex items-center gap-4 z-50 bg-background/80 backdrop-blur-sm p-2 rounded-full">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="rounded-full w-10 h-10 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserButton afterSignOutUrl="/" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="flex items-center gap-2 p-4">
                <div className="flex flex-col">
                  <span className="font-medium">{user?.fullName}</span>
                  <span className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Welcome Header */}
        <section className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Welcome back, {user?.firstName}!
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