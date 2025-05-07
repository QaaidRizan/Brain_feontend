// Import your environment variables (for client-side usage)
const token = process.env.VITE_OPENROUTER_API_KEY;
const siteUrl = process.env.SITE_URL || "https://openrouter.ai/api/v1";
const siteName = "Brain Tumor Detection App";

export async function getAIResponse(message: string): Promise<string> {
  try {
    // For client-side debugging
    console.log("Sending message to AI:", message.substring(0, 50) + (message.length > 50 ? "..." : ""));
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API error response:", errorData);
      throw new Error(errorData.error || `API error: ${response.statusText}`);
    }
    
    const result = await response.json();
    const rawResponse = result.choices?.[0]?.message?.content || "Sorry, I couldn't process your request.";
    
    // Format the response for clean display
    return rawResponse
      .replace(/\*\*/g, '')      // Remove markdown bold
      .replace(/\n{2,}/g, '\n')  // Limit consecutive newlines
      .trim();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "I'm currently unable to respond. Please try again later.";
  }
}