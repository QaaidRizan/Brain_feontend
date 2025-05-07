"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { AnalysisResult } from "@/types"

interface HistorySectionProps {
  history: AnalysisResult[]
  onSelectResult: (result: AnalysisResult) => void
}

export default function HistorySection({ history, onSelectResult }: HistorySectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHistory = history.filter(
    (item) =>
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (history.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
          <Calendar className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Upload History</h3>
        <p className="text-muted-foreground">Your upload and analysis history will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upload History</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search history..."
            className="pl-8 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No matching results found</p>
        ) : (
          filteredHistory.map((item, index) => (
            <Card key={index} className="hover:border-primary transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={`Scan ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium truncate max-w-[200px]">{item.fileName}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={item.hasTumor ? "destructive" : "default"}>
                    {item.hasTumor ? "Tumor" : "No Tumor"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => onSelectResult(item)}>
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

