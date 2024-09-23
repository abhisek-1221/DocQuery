import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle } from 'lucide-react'
import { MessageSquare, Plus, Search, Folder, Star, Archive, Settings, HelpCircle, Send, Download, RefreshCw } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'

type Props = {
    chats: DrizzleChat[],
    chatId: number,
    isPro: boolean;
    userName: string;
}

const ChatSideBar = (props: Props) => {
  return (
    <div className='flex flex-col h-full p-4 text-gray-200 bg-transparent'>
      <Link href='/'>
      <Button className="mb-6 w-full rounded-2xl bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 text-white hover:text-black" variant="secondary">
          <PlusCircle className='w-4 h-4 mr-2' />
          New Chat
        </Button>
      </Link>

      <ScrollArea className="flex flex-col gap-2 mt-4 flex-grow overflow-y-auto">
      <div className="space-y-3">
            {['Folder', 'Favorite', 'Archive'].map((item, index) => (
              <div key={item} className="flex items-center justify-between p-3 hover:bg-white hover:bg-opacity-10 rounded-2xl transition-all duration-300">
                <div className="flex items-center">
                  {index === 0 ? <Folder className="mr-3 h-5 w-5" /> :
                   index === 1 ? <Star className="mr-3 h-5 w-5" /> :
                   <Archive className="mr-3 h-5 w-5" />}
                  <span>{item}</span>
                </div>
                <span className="text-gray-400">{index === 0 ? 8 : index === 1 ? 15 : 36}</span>
              </div>
            ))}
        {props.chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}>
            <div className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
              'bg-stone-600 text-white': chat.id === props.chatId,
              'hover:text-white hover:bg-white hover:bg-opacity-10': chat.id !== props.chatId,
            })}>
              <MessageCircle className='mr-2' />
              <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.pdfName}</p>
            </div>
          </Link>
        ))}
        </div>
      </ScrollArea>
      <div className="mt-auto pt-6 space-y-3">
      <Link href='/'>
          <Button className='w-full bg-[#94625c] transition-colors duration-300 hover:border hover:border-dashed rounded-2xl'>Back to Home</Button>
        </Link>
        <div className="flex items-center p-3 space-x-4">
            <UserButton />
            <span>{props.userName}</span>
          </div>
      </div>
    </div>
  )
}

export default ChatSideBar;
