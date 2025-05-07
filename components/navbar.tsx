"use client"

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { LogOut, Menu, X, Brain, Home } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { user, isLoaded } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Track scroll position for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const goToHome = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={goToHome}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className={`font-bold text-xl ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
              BrainDetect
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              href="/"
              className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors relative group"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('knowledge')}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors relative group"
            >
              Knowledge
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('guidance')}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors relative group"
            >
              User Guidance
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Right Side: Authentication + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Authentication Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all duration-300">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 shadow-sm hover:shadow-md transition-all duration-300">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-4">
                  {isLoaded && user && (
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <span>Welcome, {user.firstName || user.username}</span>
                    </div>
                  )}
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-blue-500 dark:border-blue-400",
                        userButtonPopoverCard: "bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800",
                        userButtonPopoverActionButton: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50",
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 shadow-xl py-4 border-t border-slate-100 dark:border-slate-700 animate-fadeIn">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              href="/"
              onClick={goToHome}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 py-2 px-4 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-left text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 py-2 px-4 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('knowledge')}
              className="text-left text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 py-2 px-4 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
            >
              Knowledge
            </button>
            <button 
              onClick={() => scrollToSection('guidance')}
              className="text-left text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 py-2 px-4 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
            >
              User Guidance
            </button>
            
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <SignedOut>
                <div className="flex flex-col gap-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/50">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-between py-2">
                  {isLoaded && user && (
                    <div className="text-sm text-slate-700 dark:text-slate-200">
                      Signed in as {user.firstName || user.username}
                    </div>
                  )}
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-blue-500 dark:border-blue-400",
                        userButtonPopoverCard: "bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800",
                        userButtonPopoverActionButton: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50",
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}