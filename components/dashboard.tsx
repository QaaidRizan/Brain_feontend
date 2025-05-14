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
import { Home, Upload, History, FileText, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"
import PdfChatSection from "@/components/pdfsection"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

 
}

export default function Dashboard() {
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [history, setHistory] = useState<AnalysisResult[]>([])
  const [activeAgentTab, setActiveAgentTab] = useState<"chat" | "schedule">("chat")
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentResult(result)
    setIsAnalyzing(false)
    setAnalysisProgress(0)
    setHistory((prev) => [result, ...prev])
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          <header className="mb-12 text-center relative">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-sm">
                  {history.length} Analyses
                </Badge>
                <ThemeToggle />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">AI-Powered Analysis Dashboard</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Upload your medical images for instant analysis and get expert insights powered by advanced AI
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="w-full bg-card rounded-lg shadow-sm border p-6">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="results" disabled={!currentResult} className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Results
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center gap-2">
                      <History className="w-4 h-4" />
                      History
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="py-4">
                    <UploadForm onAnalysisComplete={handleAnalysisComplete} />
                    {isAnalyzing && (
                      <div className="mt-8 space-y-4">
                        <Progress value={analysisProgress} className="w-full" />
                        <div className="flex items-center justify-center gap-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <p className="text-muted-foreground">Analyzing image...</p>
                        </div>
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
              <div className="h-full flex flex-col bg-card rounded-lg shadow-sm border p-6">
                <div className="flex border-b mb-6">
                  <button
                    className={`flex-1 py-3 font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeAgentTab === "chat"
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setActiveAgentTab("chat")}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat Assistant
                  </button>
                  <button
                    className={`flex-1 py-3 font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeAgentTab === "schedule"
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setActiveAgentTab("schedule")}
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule
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

          <div className="mt-12 bg-card rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              PDF Chat Assistant
            </h2>
            <PdfChatSection />
          </div>
        </div>
      </div>
    </div>
  )
}