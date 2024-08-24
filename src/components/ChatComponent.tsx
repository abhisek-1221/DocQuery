"use client"

import React, { useEffect } from 'react'
import { Input } from './ui/input'
import { useChat } from 'ai/react'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import MessageList from './MessageList'
import axios from 'axios'
import { Message } from 'ai/react'
import { useQuery } from '@tanstack/react-query'
import { DialogDemo } from './pdfmodal'


type Props = 
{ 
  chatId: number
  pdfUrl: string
}

const ChatComponent = ({ chatId, pdfUrl }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat(
    {
      api: '/api/chat',
      body: {
        chatId
      },
      initialMessages: data || [],
    }
  );

  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col h-full bg-gray-900 shadow-lg rounded-lg">
      {/* Chat Header */}
      <div className="flex p-4 bg-gray-800 rounded-t-lg border-b border-gray-700 justify-between items-start">
        <div>
        <h3 className="text-xl font-bold text-white">Make Your Conversation</h3>
        </div>
        <div>
          <DialogDemo pdfUrl={pdfUrl} />
        </div>
      </div>

      {/* Message List Container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900"
        id="message-container"
      >
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Input and Button Container */}
      <form onSubmit={handleSubmit} className="flex-shrink-0 p-4 bg-gray-800 rounded-b-lg border-t border-gray-700">
        <div className="flex items-center">
          <Input
            placeholder="Ask a question..."
            className="w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 ml-2 p-2 rounded-lg transition-colors duration-200 ease-in-out">
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatComponent
