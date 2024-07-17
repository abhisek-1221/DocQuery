"use client"

import React from 'react'
import { Input } from './ui/input'
import { useChat } from 'ai/react'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import MessageList from './MessageList'
import axios from 'axios'
import { Message } from 'ai/react'
import { useQuery } from '@tanstack/react-query'

type Props = {chatId: number}

const ChatComponent = ({chatId}: Props) => {
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
      api:'/api/chat',
      body: {
        chatId
    },
    initialMessages: data || [],
  }
  );
  React.useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if(messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])
  return (
    <div className='relative max-h-screen overflow-scroll' id='message-container'>
      <div className='sticky top-0 inset-x-0 p-2 h-fit'>
        <h3 className='text-xl font-bold text-white'>
          Chat Component
        </h3>
      </div>

      <MessageList messages={messages} isLoading={isLoading} />

      <form onSubmit={handleSubmit}
      className='sticky bottom-0 inset-x-0 px-2 py-4'>
        <div className='flex'>
        <Input 
        placeholder='Ask a question...'
        className='w-full'
        value={input}
        onChange={handleInputChange}
        />
        <Button className='bg-blue-600 ml-2'>
          <Send className='h-4 w-4' />
        </Button>
        </div>
      </form>
    </div>


    

  )
}

export default ChatComponent