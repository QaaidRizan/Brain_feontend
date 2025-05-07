import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { message } = await req.json()

  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "Server configuration error: Missing API key" },
      { status: 500 }
    )
  }

  const headers = {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': process.env.SITE_URL || 'https://openrouter.ai/api/v1/chat/completions',
    'X-Title': 'Brain Tumor Detection App'
  }

  const body = JSON.stringify({
    model: "deepseek/deepseek-r1:free",
    messages: [
      {
        role: "system",
        content: `You are a neuro-oncology specialist assistant. Follow these guidelines strictly:

1. Communication Approach:
- Use simple, clear language at a 8th grade reading level
- Present information in concise bullet points when listing items
- Maintain a compassionate but professional tone
- Never use emojis, symbols, or markdown formatting

2. Medical Information Delivery:
- First address immediate emotional concerns briefly
- Then provide factual medical information:
  • Tumor characteristics
  • Diagnostic procedures
  • Treatment options
  • Support resources
- Always qualify statements with "typically" or "often" to acknowledge variability

3. Response Structure:

- 1-2 sentences per bullet point
- End by asking if clarification is needed

4. Required Disclaimers:

- "Treatment outcomes vary by individual factors"
- "Let me know which aspect you'd like to explore further"

Example Response:
"MRI scans typically show tumor size and location. Would you like details on:
• How to prepare for an MRI
• What the images reveal
• Questions to ask your doctor?

You are a neuro-oncology specialist. Follow these formatting rules:
  
  1. NEVER use markdown, asterisks, or special formatting (only can use qution mark and bracket and bullet points)
  2. For lists ALWAYS use this exact format:
     First sentence introducing the list
     • List item one
     • List item two
     • List item three
     
  3. Example response:
     "Here are key points about gliomas:
     • Typically graded from I to IV
     • Treatment often involves surgery first
     • May require combined therapies"
     
  4. Put disclaimers on new lines
"`

      },
      {
        role: "user",
        content: message
      }
    ],
    temperature: 0.7
  })

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenRouter API error:", errorText)
      return NextResponse.json(
        { error: "Error from AI service: " + response.statusText },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch AI response:", error)
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 }
    )
  }
}