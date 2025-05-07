import type { AnalysisResult } from "@/types"

// This is a mock implementation that simulates API calls to your Python backend
// In a real application, you would replace this with actual API calls

export async function analyzeImage(file: File): Promise<string> {
  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Send the file to the Flask backend
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to analyze the image");
    }

    // Get the result from the backend
    const result = await response.text();

    // Return only the result (Yes Brain Tumor or No Brain Tumor)
    return result;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}

export async function fetchHistory(): Promise<AnalysisResult[]> {
  // In a real app, you would fetch this from your backend
  return []
}

