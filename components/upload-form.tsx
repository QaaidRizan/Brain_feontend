"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileImage, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { analyzeImage } from "@/lib/api"
import type { AnalysisResult } from "@/types"

interface UploadFormProps {
  onAnalysisComplete: (result: AnalysisResult) => void // Pass the result to the parent
}

export default function UploadForm({ onAnalysisComplete }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/dicom"]
      if (!validTypes.includes(file.type) && !file.name.endsWith(".dcm")) {
        setError("Please upload a valid medical image file (JPEG, PNG, or DICOM)")
        setSelectedFile(null)
        setPreviewUrl(null)
        return
      }

      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit")
        setSelectedFile(null)
        setPreviewUrl(null)
        return
      }

      setSelectedFile(file)

      // Create preview for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        // For DICOM files, show a placeholder
        setPreviewUrl("/placeholder.svg?height=300&width=300")
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      setError("Please select a file to upload")
      return
    }

    try {
      setError(null)

      // Send the file to the backend and get the result
      const resultString = await analyzeImage(selectedFile)

      // Map the result string to the AnalysisResult object
      const analysisResult: AnalysisResult = {
        hasTumor: resultString === "Yes Brain Tumor",
        confidence: resultString === "Yes Brain Tumor" ? 90 : 95, // Placeholder confidence
        fileName: selectedFile.name,
        imageUrl: previewUrl || "",
        date: new Date().toLocaleString(),
        id: "",
      }

      onAnalysisComplete(analysisResult) // Pass the result to the parent
    } catch (err) {
      setError("An error occurred during analysis. Please try again.")
      console.error(err)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Medical Image</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card
          className="mb-4 border-dashed border-2 hover:border-primary transition-colors cursor-pointer"
          onClick={handleUploadClick}
        >
          <CardContent className="flex flex-col items-center justify-center py-10">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".jpg,.jpeg,.png,.dcm,image/dicom"
            />

            {previewUrl ? (
              <div className="text-center">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Image preview"
                  className="max-h-64 max-w-full mb-4 rounded-md"
                />
                <p className="text-sm text-muted-foreground mb-2">{selectedFile?.name}</p>
                <p className="text-xs text-muted-foreground">Click to change file</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <FileImage className="h-10 w-10 text-primary" />
                </div>
                <p className="text-muted-foreground mb-1">Drag and drop or click to upload</p>
                <p className="text-xs text-muted-foreground">Supports JPEG, PNG, and DICOM files</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" disabled={!selectedFile} className="w-full md:w-auto">
            <Upload className="mr-2 h-4 w-4" />
            Analyze Image
          </Button>
        </div>
      </form>
    </div>
  )
}