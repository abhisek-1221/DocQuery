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
import { PromptInputWithActions } from './PromptInput'

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
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAssistantTyping(true)
    handleSubmit(e)
  }
  
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden rounded-3xl bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-200/20 shadow-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 md:p-4 lg:p-6 border-b border-gray-200/20 bg-gradient-to-r from-stone-900 to-black">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Ask AI</h3>
        <DialogDemo pdfUrl={pdfUrl} />
      </div>
      
      {/* Message List Container */}
      <div
        id="message-container"
        className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4 lg:space-y-6 bg-gradient-to-b from-stone-900 via-[#120a09] to-black"
      >
        <MessageList messages={messages} isLoading={isLoading} />
        {isAssistantTyping && (
          <div className="flex items-start space-x-2 md:space-x-4 animate-pulse">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-stone-400 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-2 sm:h-3 md:h-4 bg-stone-600 rounded w-3/4"></div>
              <div className="h-2 sm:h-3 md:h-4 bg-stone-600 rounded w-1/2"></div>
              <div className="h-2 sm:h-3 md:h-4 bg-stone-600 rounded w-1/4"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input and Button Container */}
      <form onSubmit={handleFormSubmit} className="flex-shrink-0 p-2 sm:p-3 md:p-4 lg:p-6 bg-gradient-to-r from-stone-900 via-[#0a0303] to-black border-t border-gray-200/20">
        <PromptInputWithActions
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleFormSubmit}
          isAssistantTyping={isAssistantTyping}
        />
      </form>
    </div>
  )
}