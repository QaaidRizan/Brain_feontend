"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, MessageSquare } from "lucide-react"
import type { AnalysisResult } from "@/types"
import dynamic from "next/dynamic"

// Dynamically import AIChat to prevent SSR
const AIChat = dynamic(() => import("./aiAgent"), { 
  ssr: false,
  loading: () => <p className="text-sm text-muted-foreground">Loading AI assistant...</p>
})

interface SchedulingAgentProps {
  currentResult: AnalysisResult | null
}

export default function SchedulingAgent({ currentResult }: SchedulingAgentProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [isScheduling, setIsScheduling] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [mounted, setMounted] = useState(false)

  const availableTimes = [
    "09:00 AM", "10:30 AM", "12:00 PM", 
    "02:00 PM", "03:30 PM", "05:00 PM"
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScheduleAppointment = () => {
    if (!date || !time) return
    
    setIsScheduling(true)
    setTimeout(() => {
      setIsScheduling(false)
      setIsScheduled(true)
    }, 1500)
  }

  if (!mounted) {
    return (
      <div className="h-full flex flex-col p-4">
        <h3 className="font-medium mb-2">Schedule Consultation</h3>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      <h3 className="font-medium mb-2">Schedule Consultation</h3>
      
      {currentResult ? (
        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <p className="text-sm">You can schedule a consultation with our specialists:</p>
            <div className="p-3 bg-muted rounded-md">
              <h4 className="font-medium text-sm">Standard Consultation</h4>
              <p className="text-xs mt-1">Schedule within the next 2 weeks</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm mb-1">Select Date</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => 
                      date < new Date() || 
                      date > new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <p className="text-sm mb-1">Select Time</p>
              <div className="grid grid-cols-2 gap-2">
                {availableTimes.map((slot) => (
                  <Button
                    key={slot}
                    variant={time === slot ? "default" : "outline"}
                    onClick={() => setTime(slot)}
                    className="h-8"
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center">
          <p className="text-muted-foreground text-sm">
            Please upload and analyze your brain scan first to schedule a consultation
          </p>
        </div>
      )}

      {currentResult && (
        <div className="mt-auto space-y-2">
          <Button 
            className="w-full"
            onClick={handleScheduleAppointment}
            disabled={!date || !time || isScheduling || isScheduled}
          >
            {isScheduling ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2">↻</span>
                Scheduling...
              </span>
            ) : isScheduled ? (
              "Appointment Scheduled!"
            ) : (
              "Confirm Appointment"
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {showChat ? "Hide AI Assistant" : "Ask AI Assistant"}
          </Button>
        </div>
      )}

      {showChat && <AIChat />}
    </div>
  )
}