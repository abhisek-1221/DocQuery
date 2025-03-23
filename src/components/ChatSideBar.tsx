'use client'

import { DrizzleChat } from '@/lib/db/schema'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircle, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { MessageSquare, Plus, Search, Folder, Star, Archive, Settings, HelpCircle, Send, Download, RefreshCw } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

type Props = {
  chats: DrizzleChat[],
  chatId: number,
  isPro: boolean;
  userName: string;
}

type ChatFolder = 'Inbox' | 'Folder' | 'Favorite' | 'Archive';

const ChatSideBar = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chatFolders, setChatFolders] = useState<Record<string, ChatFolder>>({});
  const [activeFolderFilter, setActiveFolderFilter] = useState<ChatFolder | null>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const moveChatToFolder = (chatId: number, folder: ChatFolder) => {
    setChatFolders(prev => ({
      ...prev,
      [chatId]: folder
    }));
  };

  const getChatsByFolder = (folder: ChatFolder) => {
    return props.chats.filter(chat => chatFolders[chat.id] === folder);
  };

  const getFolderCount = (folder: ChatFolder) => {
    return props.chats.filter(chat => chatFolders[chat.id] === folder).length;
  };

  const filteredChats = activeFolderFilter 
    ? props.chats.filter(chat => chatFolders[chat.id] === activeFolderFilter)
    : props.chats.filter(chat => !chatFolders[chat.id] || chatFolders[chat.id] === 'Inbox');

  return (
    <div className={cn(
      'flex flex-col h-full bg-transparent transition-all duration-300 relative',
      isCollapsed ? 'md:w-16' : 'p-4'
    )}>
      {/* Collapse/Expand Button (visible on medium screens and up) */}
      <button 
        className="absolute -right-3 top-10 bg-stone-700 text-white rounded-full p-1 hidden md:flex items-center justify-center z-10 shadow-md"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* New Chat Button */}
      <Link href='/'>
        <Button className={cn(
          "mb-6 rounded-2xl bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 text-white hover:text-black",
          isCollapsed ? "w-10 h-10 p-0 mx-auto" : "w-full"
        )} variant="secondary">
          {isCollapsed ? <PlusCircle className='w-5 h-5' /> : (
            <>
              <PlusCircle className='w-4 h-4 mr-2' />
              New Chat
            </>
          )}
        </Button>
      </Link>

      {/* Folders */}
      <div className={cn("flex flex-col gap-1 mb-4", isCollapsed && "items-center")}>
        {['Inbox', 'Folder', 'Favorite', 'Archive'].map((item, index) => (
          <button 
            key={item} 
            className={cn(
              "flex items-center justify-between p-3 hover:bg-white hover:bg-opacity-10 rounded-2xl transition-all duration-300 w-full",
              activeFolderFilter === item && "bg-white bg-opacity-10"
            )}
            onClick={() => setActiveFolderFilter(activeFolderFilter === item as ChatFolder ? null : item as ChatFolder)}
          >
            <div className="flex items-center">
              {index === 0 ? <MessageSquare className={cn("h-5 w-5", !isCollapsed && "mr-3")} /> :
               index === 1 ? <Folder className={cn("h-5 w-5", !isCollapsed && "mr-3")} /> :
               index === 2 ? <Star className={cn("h-5 w-5", !isCollapsed && "mr-3")} /> :
               <Archive className={cn("h-5 w-5", !isCollapsed && "mr-3")} />}
              {!isCollapsed && <span>{item}</span>}
            </div>
            {!isCollapsed && (
              <span className="text-gray-400">{getFolderCount(item as ChatFolder)}</span>
            )}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-grow overflow-y-auto">
        <div className="space-y-1">
          {filteredChats.map((chat) => (
            <div key={chat.id} className="flex items-center">
              <Link href={`/chat/${chat.id}`} className="flex-grow">
                <div className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                  'bg-stone-600 text-white': chat.id === props.chatId,
                  'hover:text-white hover:bg-white hover:bg-opacity-10': chat.id !== props.chatId,
                })}>
                  <MessageCircle className={cn('w-5 h-5', !isCollapsed && 'mr-2')} />
                  {!isCollapsed && (
                    <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>
                      {chat.pdfName}
                    </p>
                  )}
                </div>
              </Link>
              {!isCollapsed && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => moveChatToFolder(chat.id, 'Inbox')}>
                      Move to Inbox
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => moveChatToFolder(chat.id, 'Folder')}>
                      Move to Folder
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => moveChatToFolder(chat.id, 'Favorite')}>
                      Add to Favorites
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => moveChatToFolder(chat.id, 'Archive')}>
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className={cn("mt-auto pt-4 space-y-3", isCollapsed && "flex flex-col items-center")}>
        {!isCollapsed && (
          <Link href='/'>
            <Button className='w-full bg-[#94625c] transition-colors duration-300 hover:border hover:border-dashed rounded-2xl'>
              Back to Home
            </Button>
          </Link>
        )}
        <div className={cn("flex items-center p-2 space-x-4", isCollapsed && "justify-center")}>
          <UserButton />
          {!isCollapsed && <span>{props.userName}</span>}
        </div>
      </div>
    </div>
  )
}

export default ChatSideBar;