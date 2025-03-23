import React from 'react'
import { Message } from 'ai/react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { Loader2 } from "lucide-react"

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
                        className={cn('flex items-end gap-2', {
                            'flex-row-reverse': message.role === 'user',
                        })}
                    >
                        <div className="flex-shrink-0">
                            <img 
                                src={message.role === 'user' 
                                    ? "https://openclipart.org/image/800px/247320" 
                                    : "https://st3.depositphotos.com/16023852/18610/v/450/depositphotos_186100106-stock-illustration-letters-logo-dark-background.jpg"
                                } 
                                alt={message.role === 'user' ? "User Avatar" : "AI Assistant Avatar"}
                                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                            />
                        </div>
                        <div className={
                            cn("rounded-2xl px-4 py-2 text-sm shadow-xl backdrop-blur-md backdrop-filter max-w-[80%]", {
                                "bg-stone-500 bg-opacity-20 text-white border border-stone-300 border-opacity-30": message.role === 'user',
                                "bg-stone-900 bg-opacity-20 text-white border border-gray-400 border-opacity-30": message.role === 'assistant',
                            })
                        }> 
                        <p className="drop-shadow-2xl text-base prose prose-invert">
                                <ReactMarkdown>
                                    {message.content}
                                </ReactMarkdown>
                        </p>
                                
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageList