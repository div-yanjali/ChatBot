"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"
import { X, Maximize2, Minimize2, Send, Bot, User, BookOpen, Home, Heart, Briefcase } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  schemes?: SchemeRecommendation[]
}

interface SchemeRecommendation {
  name: string
  category: string
  description: string
  eligibility: string
  benefits: string
  applicationLink: string
}

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your GovGuide AI assistant. I can help you find government schemes, scholarships, and check your eligibility. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock scheme database for AI responses
  const mockSchemes: SchemeRecommendation[] = [
    {
      name: "PM Awas Yojana",
      category: "Housing",
      description: "Affordable housing for economically weaker sections",
      eligibility: "Annual family income less than ₹6 lakhs",
      benefits: "Subsidy up to ₹2.67 lakhs on home loans",
      applicationLink: "#",
    },
    {
      name: "Pradhan Mantri Scholarship Scheme",
      category: "Education",
      description: "Merit-based scholarship for higher education",
      eligibility: "12th grade marks above 85%, family income < ₹8 lakhs",
      benefits: "₹25,000 per year for 4 years",
      applicationLink: "#",
    },
    {
      name: "Ayushman Bharat",
      category: "Healthcare",
      description: "Health insurance coverage for families",
      eligibility: "BPL families and specified occupational categories",
      benefits: "Health coverage up to ₹5 lakhs per family per year",
      applicationLink: "#",
    },
    {
      name: "Skill India Mission",
      category: "Employment",
      description: "Skill development and training programs",
      eligibility: "Age 18-35 years, any educational background",
      benefits: "Free training + certification + job placement assistance",
      applicationLink: "#",
    },
  ]

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mock AI response generator
  const generateAIResponse = (userMessage: string): { content: string; schemes?: SchemeRecommendation[] } => {
    const lowerMessage = userMessage.toLowerCase()

    // Housing related queries
    if (lowerMessage.includes("housing") || lowerMessage.includes("home") || lowerMessage.includes("awas")) {
      return {
        content:
          "I found some housing schemes that might interest you! The PM Awas Yojana is particularly popular for affordable housing.",
        schemes: mockSchemes.filter((s) => s.category === "Housing"),
      }
    }

    // Education related queries
    if (lowerMessage.includes("education") || lowerMessage.includes("scholarship") || lowerMessage.includes("study")) {
      return {
        content:
          "Here are some education and scholarship schemes available. These can help with your educational expenses.",
        schemes: mockSchemes.filter((s) => s.category === "Education"),
      }
    }

    // Healthcare related queries
    if (lowerMessage.includes("health") || lowerMessage.includes("medical") || lowerMessage.includes("insurance")) {
      return {
        content: "I found healthcare schemes that provide medical coverage and benefits.",
        schemes: mockSchemes.filter((s) => s.category === "Healthcare"),
      }
    }

    // Employment related queries
    if (lowerMessage.includes("job") || lowerMessage.includes("employment") || lowerMessage.includes("skill")) {
      return {
        content: "Here are employment and skill development schemes to help with career growth.",
        schemes: mockSchemes.filter((s) => s.category === "Employment"),
      }
    }

    // General eligibility check
    if (lowerMessage.includes("eligible") || lowerMessage.includes("qualify")) {
      return {
        content:
          "To check your eligibility, I'll need some information about your income, age, and specific requirements. Here are some popular schemes across categories:",
        schemes: mockSchemes.slice(0, 2),
      }
    }

    // Default response with all schemes
    return {
      content:
        "I can help you with various government schemes! Here are some popular options across different categories:",
      schemes: mockSchemes,
    }
  }

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: aiResponse.content,
        timestamp: new Date(),
        schemes: aiResponse.schemes,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "housing":
        return Home
      case "education":
        return BookOpen
      case "healthcare":
        return Heart
      case "employment":
        return Briefcase
      default:
        return BookOpen
    }
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 ${isFullscreen ? "" : "p-4"}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Chat Container */}
      <div
        className={`relative bg-background border rounded-lg shadow-2xl ${
          isFullscreen ? "w-full h-full rounded-none" : "w-full max-w-4xl h-[80vh] mx-auto mt-[10vh]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-green-50 dark:bg-green-950/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">GovGuide AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Government Schemes Expert</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className={`${isFullscreen ? "h-[calc(100vh-140px)]" : "h-[calc(80vh-140px)]"} p-4`}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user" ? "bg-blue-600" : "bg-green-600"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="space-y-2">
                    <div
                      className={`p-3 rounded-lg ${message.type === "user" ? "bg-blue-600 text-white" : "bg-muted"}`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>

                    {/* Scheme Recommendations */}
                    {message.schemes && message.schemes.length > 0 && (
                      <div className="space-y-2">
                        {message.schemes.map((scheme, index) => {
                          const IconComponent = getCategoryIcon(scheme.category)
                          return (
                            <Card key={index} className="border-green-200 dark:border-green-800">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-base flex items-center space-x-2">
                                    <IconComponent className="h-4 w-4 text-green-600" />
                                    <span>{scheme.name}</span>
                                  </CardTitle>
                                  <Badge variant="secondary">{scheme.category}</Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground">{scheme.description}</p>
                                <div className="space-y-1">
                                  <p className="text-xs">
                                    <strong>Eligibility:</strong> {scheme.eligibility}
                                  </p>
                                  <p className="text-xs">
                                    <strong>Benefits:</strong> {scheme.benefits}
                                  </p>
                                </div>
                                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                  Apply Now
                                </Button>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about government schemes, eligibility, or benefits..."
              className="flex-1 border-green-200 dark:border-green-800 focus:border-green-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("What housing schemes are available?")}
              className="text-xs border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950"
            >
              Housing Schemes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Show me education scholarships")}
              className="text-xs border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950"
            >
              Education
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Check my eligibility for schemes")}
              className="text-xs border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950"
            >
              Check Eligibility
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
