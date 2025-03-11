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
    <div className="relative flex flex-col bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden h-[90vh] w-full sm:w-[90vw] max-w-5xl mx-auto shadow-2xl shadow-stone-400 border border-gray-200 border-opacity-20">
      {/* Chat Header */}
      <div className="flex p-3 sm:p-6 backdrop-filter backdrop-blur-3xl rounded-t-lg border-b border-gray-200 border-opacity-20 justify-between items-center bg-gradient-to-r from-stone-900 to-black">
        <div>
          <h3 className="text-xl sm:text-3xl font-bold text-white">Ask AI</h3>
        </div>
        <div>
          <DialogDemo pdfUrl={pdfUrl} />
        </div>
      </div>

      {/* Message List Container */}
      <div
        className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-stone-900 via-[#120a09] to-black"
        id="message-container"
      >
        <MessageList messages={messages} isLoading={isLoading} />
        {isAssistantTyping && (
          <div className="flex items-start space-x-2 sm:space-x-4 animate-pulse">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-stone-400 rounded-full"></div>
            <div className="flex-1 space-y-2 sm:space-y-3">
              <div className="h-3 sm:h-4 bg-stone-600 rounded w-3/4"></div>
              <div className="h-3 sm:h-4 bg-stone-600 rounded w-1/2"></div>
              <div className="h-3 sm:h-4 bg-stone-600 rounded w-1/4"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input and Button Container */}
      <form onSubmit={handleFormSubmit} className="flex-shrink-0 p-3 sm:p-6 bg-gradient-to-r from-stone-900 via-[#0a0303] to-black rounded-b-lg border-t border-gray-200 border-opacity-20">
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

