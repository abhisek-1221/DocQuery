"use client"

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
}


const ChatSideBar = (props: Props) => {
    const [loading, setLoading] = React.useState(false);
    const handleSubscription = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/stripe');
            window.location.href = response.data.url;
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

  return (
    <div className='w-full h-screen p-4 text-gray-200 bg-transparent'>
        <Link href='/'>
            <Button className='w-full border-dashed border-white border'>
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

                    <div className="absolute bottom-4 left-4">
                        <div className='flex items-center gap-2 text-sm text-slate-500 flex-wrap'>
                            <Link href='/'>Home</Link>
                            <Link href='/'>Source</Link>
                        </div>
                        <Button className='mt-2 text-white bg-blue-600' 
                        disabled={loading}
                        onClick={handleSubscription}>
                            Upgrade to Pro
                        </Button>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default ChatSideBar