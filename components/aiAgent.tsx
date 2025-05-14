// components/ai-chat.tsx
"use client"

import { useEffect, useState } from "react"

export default function AIChat() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.type = 'module'
      script.innerHTML = `
        import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
        createChat({
          webhookUrl: 'https://mohamed2.app.n8n.cloud/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat',
          title: 'Medical AI Assistant',
          subtitle: 'Ask questions about your results',
          theme: {
            primaryColor: '#6366F1',
            secondaryColor: '#EC4899',
          },
          welcomeMessage: 'Hello! I can help answer questions about your brain scan results.',
        });
      `
      document.body.appendChild(script)

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css'
      document.head.appendChild(link)

      return () => {
        document.body.removeChild(script)
        document.head.removeChild(link)
      }
    }
  }, [])

  if (!mounted) return null

  return null
}