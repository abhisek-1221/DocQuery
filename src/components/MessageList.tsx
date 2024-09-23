import React from 'react'
import { Message } from 'ai/react'
import { messages } from '@/lib/db/schema'
import { cn } from '@/lib/utils'
import { Loader2 } from "lucide-react";

type Props = {
    isLoading: boolean,
    messages: Message[]
}

const MessageList = ({messages, isLoading}: Props) => {
    if(isLoading) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            </div>
        );
    }   
    if(!messages) return <></>
    return(
        <div className="flex flex-col gap-4 px-4">
            {messages.map(message => {
                return(
                    <div key={message.id} 
                        className={cn('flex', {
                            'justify-end pl-10': message.role === 'user',
                            'justify-start pr-10': message.role === 'assistant',
                        })}
                    >
                        <div className={
                            cn("rounded-2xl px-4 py-2 text-sm shadow-xl backdrop-blur-md backdrop-filter", {
                                "bg-stone-500 bg-opacity-20 text-white border border-stone-300 border-opacity-30": message.role === 'user',
                                "bg-gray-600 bg-opacity-20 text-white border border-gray-400 border-opacity-30": message.role === 'assistant',
                            })
                        }>
                            <p className="drop-shadow-2xl text-base">
                                {message.content}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageList