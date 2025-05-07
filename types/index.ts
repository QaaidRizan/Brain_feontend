export interface AnalysisResult {
  id: string
  fileName: string
  imageUrl: string
  date: string
  hasTumor: boolean
  confidence: number
  details?: string
}

