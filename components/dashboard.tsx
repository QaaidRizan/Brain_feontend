"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadForm from "@/components/upload-form"
import ResultsDisplay from "@/components/results-display"
import HistorySection from "@/components/history-section"
import ChatbotSection from "@/components/chatbot-section"
import SchedulingAgent from "@/components/scheduling-agent"
import { useTheme } from 'next-themes'
import type { AnalysisResult } from "@/types"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"
import PdfChatSection from "@/components/pdfsection" // Import PdfChatSection

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default function Dashboard() {
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [history, setHistory] = useState<AnalysisResult[]>([])
  const [activeAgentTab, setActiveAgentTab] = useState<"chat" | "schedule">("chat")

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentResult(result)
    setIsAnalyzing(false)
    setHistory((prev) => [result, ...prev])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-fade-in">
        <header className="mb-8 text-center relative">
          <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">AI-Powered Analysis Dashboard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your medical images for instant analysis and get expert insights
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="w-full">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="results" disabled={!currentResult}>
                    Results
                  </TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="py-4">
                  <UploadForm onAnalysisComplete={handleAnalysisComplete} />
                  {isAnalyzing && (
                    <div className="mt-6 text-center animate-fade-in">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <p className="mt-2 text-muted-foreground">Analyzing image...</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="results" className="py-4">
                  {currentResult && <ResultsDisplay result={currentResult} />}
                </TabsContent>
                <TabsContent value="history" className="py-4">
                  <HistorySection history={history} onSelectResult={setCurrentResult} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="h-full flex flex-col">
              <div className="flex border-b mb-4">
                <button
                  className={`flex-1 py-2 font-medium transition-colors ${
                    activeAgentTab === "chat"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setActiveAgentTab("chat")}
                >
                  Chat Assistant
                </button>
                <button
                  className={`flex-1 py-2 font-medium transition-colors ${
                    activeAgentTab === "schedule"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setActiveAgentTab("schedule")}
                >
                  Schedule Appointment
                </button>
              </div>
              
              <div className="flex-1 overflow-hidden">
                {activeAgentTab === "chat" ? (
                  <ChatbotSection />
                ) : (
                  <SchedulingAgent currentResult={currentResult} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add the PdfChatSection below the existing layout */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-4">PDF Chat Assistant</h2>
          <PdfChatSection />
        </div>
      </div>
    </div>
  )
}