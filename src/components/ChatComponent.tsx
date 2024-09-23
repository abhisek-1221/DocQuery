'use client'

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useChat } from 'ai/react'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import MessageList from './MessageList'
import axios from 'axios'
import { Message } from 'ai/react'
import { useQuery } from '@tanstack/react-query'
import { DialogDemo } from './pdfmodal'

type Props = {
  chatId: number
  pdfUrl: string
}

export default function ChatComponent({ chatId, pdfUrl }: Props) {
  const [isAssistantTyping, setIsAssistantTyping] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      })
      return response.data
    },
  })

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: '/api/chat',
    body: {
      chatId
    },
    initialMessages: data || [],
    onFinish: () => setIsAssistantTyping(false),
  })

  useEffect(() => {
    const messageContainer = document.getElementById('message-container')
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsAssistantTyping(true)
    handleSubmit(e)
  }

  return (
    <div className="relative flex flex-col bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden h-[90vh] w-[90vw] max-w-6xl mx-auto shadow-2xl border border-gray-200 border-opacity-20">
      {/* Chat Header */}
      <div className="flex p-6 backdrop-filter backdrop-blur-3xl rounded-t-lg border-b border-gray-200 border-opacity-20 justify-between items-center bg-gradient-to-r from-stone-900 to-black">
        <div>
          <h3 className="text-3xl font-bold text-white">Ask AI</h3>
        </div>
        <div>
          <DialogDemo pdfUrl={pdfUrl} />
        </div>
      </div>

      {/* Message List Container */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-stone-900 via-[#120a09] to-black"
        id="message-container"
      >
        <MessageList messages={messages} isLoading={isLoading} />
        {isAssistantTyping && (
          <div className="flex items-start space-x-4 animate-pulse">
            <div className="w-10 h-10 bg-stone-400 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-stone-600 rounded w-3/4"></div>
              <div className="h-4 bg-stone-600 rounded w-1/2"></div>
              <div className="h-4 bg-stone-600 rounded w-1/4"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input and Button Container */}
      <form onSubmit={handleFormSubmit} className="flex-shrink-0 p-6 bg-gradient-to-r from-stone-900 via-[#0a0303] to-black rounded-b-lg border-t border-gray-200 border-opacity-20">
        <div className="flex items-center">
          <Input 
            placeholder="Enter a prompt here..." 
            className="flex-1 mr-4 rounded-full py-3 px-6 text-lg bg-white bg-opacity-20 border-none focus:ring-2 focus:ring-white focus:bg-opacity-30 transition-all duration-300 text-white placeholder-gray-300"
            value={input}
            onChange={handleInputChange}
          />
          <Button 
            size="lg" 
            type="submit" 
            className="rounded-full bg-[#231513] hover:bg-opacity-80 transition-colors duration-300 px-6 py-3"
            disabled={isAssistantTyping}
          >
            <Send className="h-6 w-6 mr-2" />
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}