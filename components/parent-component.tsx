"use client"

import { useState } from "react"
import UploadForm from "@/components/upload-form"
import ResultsDisplay from "@/components/results-display"
import type { AnalysisResult } from "@/types"

export default function ParentComponent() {
  const [result, setResult] = useState<AnalysisResult | null>(null)

  return (
    <div>
      <UploadForm onAnalysisComplete={setResult} />
      {result && <ResultsDisplay result={result} />}
    </div>
  )
}