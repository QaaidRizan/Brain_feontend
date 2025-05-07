"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Users, 
  Trophy, 
  HeartPulse, 
  BookOpen, 
  GraduationCap, 
  Microscope,
  Award,
  ChevronRight,
  Check,
  Calendar 
} from "lucide-react"
import Navbar from "@/components/navbar"

export default function AboutPage() {
  const { theme } = useTheme()

  const milestones = [
    {
      year: "2010",
      title: "Hospital Founded",
      description: "Brain Tumor Center was established with a mission to provide specialized care for neurological conditions."
    },
    {
      year: "2013",
      title: "Research Department",
      description: "Launched dedicated research department focused on brain tumor treatment innovations."
    },
    {
      year: "2016",
      title: "AI Technology Integration",
      description: "Pioneered the integration of AI technology for brain tumor detection and analysis."
    },
    {
      year: "2018",
      title: "International Recognition",
      description: "Received international recognition for our advanced treatment methodologies."
    },
    {
      year: "2020",
      title: "Expansion",
      description: "Expanded our facility to accommodate more patients and advanced equipment."
    },
    {
      year: "2023",
      title: "AI Diagnostic Platform",
      description: "Launched our proprietary AI-powered diagnostic platform for remote consultations."
    }
  ]

  const values = [
    {
      icon: <HeartPulse className="w-10 h-10 text-blue-600" />,
      title: "Compassionate Care",
      description: "We treat each patient with dignity, respect, and empathy, recognizing their unique needs."
    },
    {
      icon: <Trophy className="w-10 h-10 text-blue-600" />,
      title: "Excellence",
      description: "We strive for the highest standards in medical care, research, and patient experience."
    },
    {
      icon: <Microscope className="w-10 h-10 text-blue-600" />,
      title: "Innovation",
      description: "We continuously seek new and better ways to diagnose, treat, and prevent brain tumors."
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Teamwork",
      description: "We collaborate across disciplines to provide comprehensive and coordinated care."
    }
  ]

  const certifications = [
    "Joint Commission International Accreditation",
    "HIMSS Stage 7 Digital Health Certification",
    "ISO 9001 Quality Management",
    "International Neuroscience Excellence Award",
    "American College of Surgeons Commission on Cancer",
    "Center of Excellence for Neurological Care"
  ]

  const team = [
    {
      name: "Dr. Robert Johnson",
      position: "Chief Medical Director",
      image: "/placeholder-user.jpg",
      bio: "Dr. Johnson has over 25 years of experience in neurosurgery and has pioneered several innovative surgical techniques for brain tumor removal."
    },
    {
      name: "Dr. Maria Garcia",
      position: "Head of Research",
      image: "/placeholder-user.jpg",
      bio: "Leading our research initiatives, Dr. Garcia has published over 100 papers on neurological conditions and treatments."
    },
    {
      name: "Dr. James Wilson",
      position: "AI Technology Director",
      image: "/placeholder-user.jpg",
      bio: "With a background in both medicine and computer science, Dr. Wilson oversees our AI-powered diagnostic systems."
    }
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-blue-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            About Brain Tumor Center
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            A center of excellence dedicated to innovative neurological care and cutting-edge brain tumor treatment
          </p>
          <div className="relative h-[400px] rounded-xl overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-blue-900/20 z-10 rounded-xl"></div>
            <Image 
              src="/placeholder.jpg" 
              alt="Hospital Building" 
              fill 
              style={{objectFit: "cover"}}
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Mission & Vision</h2>
              <div className="space-y-6 text-slate-700 dark:text-slate-300">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Our Mission</h3>
                  <p>
                    To provide exceptional, compassionate care to patients with brain tumors and other neurological conditions through innovative diagnostic technologies, advanced treatments, and patient-centered approaches.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Our Vision</h3>
                  <p>
                    To be a global leader in neurological care, pioneering breakthroughs in brain tumor detection, treatment, and prevention, while improving outcomes and quality of life for patients worldwide.
                  </p>
                </div>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="p-6 bg-white dark:bg-slate-800 shadow-md border-0">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Excellence in Care</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Our hospital has been recognized for excellence in neurological care with multiple international awards and certifications.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white dark:bg-slate-800 shadow-md border-0">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Patient Education</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      We believe in empowering patients through education about their conditions and treatment options.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white dark:bg-slate-800 shadow-md border-0">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Research & Training</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      We are committed to advancing medical knowledge through research and training the next generation of specialists.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-blue-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              The principles that guide our approach to patient care, research, and community service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 bg-white dark:bg-slate-700 shadow-md border-0 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Leadership Team</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Meet the experts guiding our mission of excellence in neurological care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden bg-white dark:bg-slate-800 shadow-md border-0">
                <div className="relative h-72 w-full">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    style={{objectFit: "cover"}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.position}</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-20 px-4 bg-blue-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our History & Milestones</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              The journey of innovation and excellence that has shaped our hospital
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-700"></div>
            <div className="space-y-16 relative">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8`}>
                  <div className="md:w-1/2 flex justify-center md:justify-end">
                    <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md w-full max-w-md">
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-slate-700 dark:text-slate-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center relative">
                    <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 z-10 flex items-center justify-center">
                      <Check className="text-white h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Certifications</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Recognized for excellence in healthcare and neurological services
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
                <div className="p-2 bg-white dark:bg-slate-700 rounded-full mr-4">
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-slate-900 dark:text-white font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Our Care?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Schedule a consultation with our specialists to discuss your treatment options
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Contact Us
              </Button>
            </Link>
            <Link href="/upload">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-blue-700">
                Upload a Scan <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}