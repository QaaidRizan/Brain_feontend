'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, File, X, LogIn } from 'lucide-react'
import { useUser, SignInButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import '../dashboard/page.css' // Importing the same CSS for consistency

export default function UploadPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUploading(false)
    // TODO: Implement actual file upload
  }

  if (!mounted) return null;

  if (!isSignedIn) {
    return (
      <div className="container mx-auto dashboard-container">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <Card className="dashboard-card p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
              <p className="text-muted-foreground mb-6">
                Please sign in to upload and analyze medical images
              </p>
              <SignInButton mode="modal">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In to Continue
                </Button>
              </SignInButton>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto dashboard-container">
      <div className="max-w-2xl mx-auto">
        <Card className="dashboard-card p-6 animate-fade-in-up">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Upload Brain Scan</h1>
            <p className="text-muted-foreground">
              Upload your medical images for AI-powered analysis
            </p>
          </div>

          <div className="border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center mb-6 animate-fade-in-up animation-delay-200">
            {selectedFile ? (
              <div className="flex items-center justify-center gap-4">
                <File className="w-8 h-8 text-blue-500" />
                <span className="font-medium">{selectedFile.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-12 h-12 text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, DICOM
                  </span>
                </div>
              </label>
            )}
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 animate-fade-in-up animation-delay-300"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : 'Start Analysis'}
          </Button>
        </Card>
      </div>
    </div>
  )
}