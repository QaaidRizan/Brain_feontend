"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, User, Send, Info } from "lucide-react"
import { getAIResponse } from "./openaiClient"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "I provide information about brain tumor diagnosis and treatment. My responses are brief and formatted for clarity. How may I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const botResponse = await getAIResponse(userMessage.text)
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm unable to respond currently. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatMessageText = (text: string) => {
    if (!text.includes('•')) return <p className="text-left">{text}</p>;

    const parts = text.split('•');
    return (
      <div className="text-left">
        <p>{parts[0]}</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          {parts.slice(1).map((part, index) => (
            <li key={index}>{part.trim()}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Neuro-Oncology Assistant</h2>
        <div className="bg-primary/10 text-primary p-1 rounded-full">
          <Info className="h-4 w-4" />
        </div>
      </div>

      <Card className="flex-grow mb-4 overflow-hidden">
        <CardContent className="p-3 h-[400px] overflow-y-auto">
          <div className="space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground ml-2" 
                      : "bg-muted text-foreground mr-2"
                  }`}>
                    {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-foreground"
                    }`}
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {formatMessageText(message.text)}
                    <p className={`text-xs opacity-70 mt-1 ${
                      message.sender === "user" ? "text-primary-foreground/70" : "text-foreground/70"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] flex flex-row">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-muted text-foreground mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="inline-block px-4 py-2 rounded-lg bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          type="text"
          placeholder="Type your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || !inputValue.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}