"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import type { AnalysisResult } from "@/types"

interface ResultsDisplayProps {
  result: AnalysisResult
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const getAdvice = () => {
    if (result.hasTumor) {
      return (
        <div className="space-y-2">
          <p>Based on our analysis, we recommend:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Consulting with a neurologist as soon as possible</li>
            <li>Scheduling additional diagnostic tests for confirmation</li>
            <li>Discussing treatment options with your healthcare provider</li>
            <li>Bringing these results to your next medical appointment</li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className="space-y-2">
          <p>Based on our analysis, we recommend:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Continuing with regular health check-ups</li>
            <li>Maintaining a healthy lifestyle</li>
            <li>Consulting with your doctor if you experience any symptoms</li>
          </ul>
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analysis Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Image Analysis</CardTitle>
            <CardDescription>Uploaded on {result.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative rounded-md overflow-hidden mb-4">
              <img
                src={result.imageUrl || "/placeholder.svg"}
                alt="Analyzed medical image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{result.fileName}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Detection Results</CardTitle>
            <CardDescription>AI-powered analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Tumor Detection:</span>
                <Badge variant={result.hasTumor ? "destructive" : "success"}>
                  {result.hasTumor ? "Tumor Detected" : "No Tumor Detected"}
                </Badge>
              </div>

                <div
                  className={`h-2.5 rounded-full ${result.hasTumor ? "bg-red-600" : "bg-green-600"}`}
                ></div>
              </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Medical Advice</h4>
              {getAdvice()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

