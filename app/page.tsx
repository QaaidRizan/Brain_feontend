"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Dashboard from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Shield, Clock, Stethoscope, MessageSquare, Calendar, AlertTriangle, MapPin, Phone, Mail, Award, Users, CheckCircle, FileText, ChevronRight } from "lucide-react"
import Background from "@/components/background"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import Navbar from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"
import { SignInButton } from "@clerk/nextjs"

const AnimatedSection = ({ 
  children, 
  delay = 0.3, 
  className = "", 
  threshold = 0.1,
  disabled = false // Add a disable option for heavy sections
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    // Add rootMargin to start animation earlier
    rootMargin: '50px 0px',
  })

  // Simpler animation with less movement
  const variants = {
    hidden: { opacity: 0, y: 20 }, // Reduced y-offset from 50 to 20
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, // Reduced duration
        delay: disabled ? 0 : delay,
        ease: "easeOut" 
      } 
    }
  }

  // Skip animation when disabled
  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const doctorsSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToDoctors = () => {
    doctorsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }

  if (!mounted) {
    return null
  }

  const doctors = [
    {
      name: "Dr. Sarah Miller",
      position: "Head of Neurosurgery",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      specialization: "Brain Tumor Surgery",
      experience: "15+ years"
    },
    {
      name: "Dr. James Wilson",
      position: "Neuro-Oncologist",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      specialization: "Tumor Treatment",
      experience: "12+ years"
    },
    {
      name: "Dr. Emily Chen",
      position: "Radiologist",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      specialization: "MRI Analysis",
      experience: "10+ years"
    },
    {
      name: "Dr. Robert Johnson",
      position: "Neuroscientist",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      specialization: "Brain Mapping",
      experience: "14+ years"
    }
  ]

  const testimonials = [
    {
      name: "Mary S.",
      text: "The AI analysis detected my tumor early, which made all the difference in my treatment journey. Forever grateful to this amazing technology and team.",
      location: "New York, NY"
    },
    {
      name: "Thomas K.",
      text: "After struggling with headaches for months, I uploaded my scan and got immediate insights. The follow-up care was exceptional.",
      location: "Los Angeles, CA"
    },
    {
      name: "Priya M.",
      text: "The AI assistant helped me understand my diagnosis and treatment options, answering all my questions with patience and clarity.",
      location: "Chicago, IL"
    }
  ]

  const stats = [
    { value: "95%", label: "Accuracy Rate" },
    { value: "2500+", label: "Patients Helped" },
    { value: "30+", label: "Specialist Doctors" },
    { value: "24/7", label: "Support Available" }
  ]

  return (
    <main className="min-h-screen relative">
      <Background />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-slate-900/50"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.5 
                }}
              >
                <Brain className="w-4 h-4 mr-2" />
              </motion.div>
              Advanced Medical Technology
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Advanced Brain Tumor Detection
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="block text-blue-600 dark:text-blue-400"
              >
                Powered by AI Technology
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8"
            >
              Experience the future of neurological care with our state-of-the-art AI-powered brain tumor detection system. 
              Get accurate results in minutes, not days.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {/* Buttons remain the same */}
              {isSignedIn ? (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={handleGetStarted}
                >
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignInButton>
              )}
              <Button 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-800 px-8 py-3 text-lg"
                onClick={scrollToAbout}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {/* Stats section */}
            {stats.slice(0, 3).map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <div className="text-slate-600 dark:text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="relative py-16 px-4 bg-blue-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              About Our Hospital
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We are a state-of-the-art facility dedicated to neurological care and innovative brain tumor treatment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/20 z-10 rounded-xl"></div>
                <div className="relative h-full w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Hospital Building" 
                    fill 
                    style={{objectFit: "cover"}}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </motion.div>

            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-2xl font-bold text-slate-800 dark:text-white mb-4"
              >
                Our Mission & Vision
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-slate-600 dark:text-slate-300 mb-6"
              >
                Founded in 2010, the Brain Tumor Center is committed to providing exceptional care for patients with neurological conditions, with a special focus on brain tumors. 
                Our facility combines advanced technology with compassionate care to deliver the best possible outcomes.
              </motion.p>
              
              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "Excellence in Care",
                    description: "We combine clinical expertise with advanced technology"
                  },
                  {
                    title: "Research & Innovation",
                    description: "Developing new approaches to diagnosis and treatment"
                  },
                  {
                    title: "Patient-Centered Approach",
                    description: "Individualized care plans for every patient"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: 0.7 + (index * 0.1) 
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={scrollToDoctors}
                >
                  Meet Our Team <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Section */}
      <section id="knowledge" ref={aboutSectionRef} className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Understanding Brain Tumors
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Brain tumors are abnormal growths of cells in the brain that can affect brain function and overall health.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-blue-100 dark:border-blue-900">
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20, 
                      delay: 0.4 
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="p-3 rounded-full bg-red-100 dark:bg-red-900"
                  >
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="text-xl font-semibold mb-2 text-slate-800 dark:text-white"
                    >
                      Common Symptoms
                    </motion.h3>
                    <motion.ul 
                      className="space-y-2 text-slate-600 dark:text-slate-300"
                    >
                      {[
                        "Persistent headaches",
                        "Seizures or convulsions",
                        "Nausea and vomiting",
                        "Vision or hearing problems",
                        "Difficulty with balance",
                        "Changes in personality or behavior"
                      ].map((symptom, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                          viewport={{ once: true, margin: "-100px" }}
                        >
                          • {symptom}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-blue-100 dark:border-blue-900">
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20, 
                      delay: 0.4 
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="p-3 rounded-full bg-blue-100 dark:bg-blue-900"
                  >
                    <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="text-xl font-semibold mb-2 text-slate-800 dark:text-white"
                    >
                      Importance of Early Detection
                    </motion.h3>
                    <motion.ul 
                      className="space-y-2 text-slate-600 dark:text-slate-300"
                    >
                      {[
                        "Better treatment outcomes",
                        "More treatment options available",
                        "Improved quality of life",
                        "Reduced risk of complications",
                        "Higher survival rates"
                      ].map((benefit, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                          viewport={{ once: true, margin: "-100px" }}
                        >
                          • {benefit}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Guidance Section */}
      <section id="guidance" className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Simple steps to get your brain scan analyzed and receive expert guidance
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((step, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">
                    {step === 1 && "Upload Scan"}
                    {step === 2 && "AI Analysis"}
                    {step === 3 && "Consult AI Assistant"}
                    {step === 4 && "Schedule Follow-up"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {step === 1 && "Upload your brain scan images securely"}
                    {step === 2 && "Get instant AI-powered analysis results"}
                    {step === 3 && "Ask questions and get medical advice"}
                    {step === 4 && "Book appointments with specialists"}
                  </p>
                  <div className="mt-4 relative h-40 rounded-lg overflow-hidden">
                    <Image 
                      src={step % 2 === 1 
                        ? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      } 
                      alt={`Step ${step}`} 
                      fill 
                      style={{objectFit: "cover"}}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Doctors Section */}
      <section ref={doctorsSectionRef} className="relative py-16 px-4 bg-blue-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Meet our world-class neurologists and specialists dedicated to your care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="overflow-hidden doctor-card">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative h-64 w-full"
                  >
                    <Image 
                      src={doctor.image} 
                      alt={doctor.name} 
                      fill 
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{objectFit: "cover"}}
                    />
                  </motion.div>
                  <div className="p-4 text-center">
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="text-lg font-bold text-slate-800 dark:text-white"
                    >
                      {doctor.name}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="text-blue-600 dark:text-blue-400 font-medium"
                    >
                      {doctor.position}
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="text-slate-600 dark:text-slate-300 text-sm mt-2"
                    >
                      <span className="block">Specialization: {doctor.specialization}</span>
                      <span className="block mt-1">Experience: {doctor.experience}</span>
                    </motion.p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Patient Success Stories
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Hear from patients who have benefited from our advanced brain tumor detection system
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.15}>
                <Card className="p-6 testimonial-card bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 pl-6 italic">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <h4 className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactSectionRef} className="relative py-16 px-4 contact-section">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Get in touch with our team for appointments, inquiries, or support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-xl font-semibold mb-6 text-slate-800 dark:text-white"
                >
                  Send Us a Message
                </motion.h3>
                <form className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                      <input type="text" className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                      <input type="email" className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                    <input type="text" className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                    <textarea rows={4} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"></textarea>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-xl font-semibold mb-6 text-slate-800 dark:text-white"
              >
                Contact Information
              </motion.h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
                    title: "Address",
                    content: "123 Medical Center Drive<br />Suite 456<br />Boston, MA 02115"
                  },
                  {
                    icon: <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
                    title: "Phone",
                    content: "Main: (555) 123-4567<br />Emergency: (555) 987-6543<br />Appointments: (555) 456-7890"
                  },
                  {
                    icon: <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
                    title: "Email",
                    content: "info@braintumorcenter.com<br />appointments@braintumorcenter.com<br />support@braintumorcenter.com"
                  },
                  {
                    icon: <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
                    title: "Hours",
                    content: "Monday - Friday: 8:00 AM - 8:00 PM<br />Saturday: 9:00 AM - 5:00 PM<br />Sunday: Emergency Care Only"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex items-start gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: 0.6 + (index * 0.1) 
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="p-3 rounded-full bg-blue-100 dark:bg-blue-900"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: item.content }}></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">BT</span>
                </div>
                <span className="text-xl font-bold">Brain Tumor Center</span>
              </div>
              <p className="text-slate-400 mb-4">
                Advanced AI-powered brain tumor detection and comprehensive neurological care.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-slate-400 hover:text-blue-400 footer-link">Home</Link></li>
                <li><Link href="/about" className="text-slate-400 hover:text-blue-400 footer-link">About Us</Link></li>
                <li><Link href="/services" className="text-slate-400 hover:text-blue-400 footer-link">Services</Link></li>
                <li><Link href="/doctors" className="text-slate-400 hover:text-blue-400 footer-link">Our Doctors</Link></li>
                <li><Link href="/dashboard" className="text-slate-400 hover:text-blue-400 footer-link">Patient Portal</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 footer-link">AI Brain Tumor Detection</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 footer-link">Neurosurgery</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 footer-link">Neuro-Oncology</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 footer-link">Radiation Therapy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 footer-link">Rehabilitation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <address className="not-italic text-slate-400">
                123 Medical Center Drive<br />
                Boston, MA 02115<br /><br />
                <a href="tel:+15551234567" className="hover:text-blue-400 footer-link">Phone: (555) 123-4567</a><br />
                <a href="mailto:info@braintumorcenter.com" className="hover:text-blue-400 footer-link">Email: info@braintumorcenter.com</a>
              </address>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} Brain Tumor Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}