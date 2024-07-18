
import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'

type Props = {
    chats: DrizzleChat[],
    chatId: number,
    isPro: boolean;
}


const ChatSideBar = (props: Props) => {

  return (
    <div className='w-full h-screen p-4 text-gray-200 bg-transparent'>
        <Link href='/'>
            <Button className='w-full border-dashed border-transparent border'>
            <PlusCircle className='w-4 h-4 mr-2 text-gray-200' />    
            New Chat</Button>
        </Link>

        <div className="flex flex-col gap-2 mt-4">
            {props.chats.map((chat) => (
                <Link href={`/chat/${chat.id}`} key={chat.id}>
                    <div className={cn("rounded-lg p-3 text-slate-300 flex items-center",{
                        'bg-purple-600 text-white': chat.id === props.chatId,
                        'hover:text-white': chat.id !== props.chatId,
                    })}>
                        <MessageCircle className='mr-2' />
                        <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.pdfName}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default ChatSideBar;