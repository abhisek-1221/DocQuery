import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Search, Folder, Star, Archive, Settings, HelpCircle, Send, Download, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';

const ChatUI = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-900 via-black to-slate-900 text-gray-100 p-4">
      {/* Sidebar */}
      <div className="w-64 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 mr-4 flex flex-col">
        <Button className="mb-6 w-full rounded-2xl bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300" variant="secondary">
          <Plus className="mr-2 h-4 w-4" /> New Chat
        </Button>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Search" className="pl-10 rounded-2xl bg-white bg-opacity-10 border-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <ScrollArea className="flex-grow">
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
            {/* Chat history items would go here */}
          </div>
        </ScrollArea>
        <div className="mt-auto pt-6 space-y-3">
          <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-2xl transition-all duration-300">
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </div>
          <div className="flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-2xl transition-all duration-300">
            <HelpCircle className="mr-3 h-5 w-5" />
            <span>Help</span>
          </div>
          <div className="flex items-center p-3">
            <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full mr-3" />
            <span>Brooklyn Simmons</span>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white border-opacity-20">
          <h1 className="text-2xl font-semibold">Ask AI</h1>
        </div>
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-start">
              <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full mr-3" />
              <div className="bg-white bg-opacity-10 rounded-2xl p-4 max-w-[80%]">
                <p>Write a 100-character meta description for my blog post about digital marketing.</p>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-gray-700 bg-opacity-70 rounded-2xl p-4 max-w-[80%]">
                <p>Master the art of digital marketing with expert strategies for online success. Unlock growth now!</p>
              </div>
              {/* <div className="flex flex-col ml-3">
                <ThumbsUp className="h-5 w-5 mb-2 cursor-pointer hover:text-purple-400 transition-colors duration-300" />
                <ThumbsDown className="h-5 w-5 cursor-pointer hover:text-purple-400 transition-colors duration-300" />
              </div> */}
            </div>
          </div>
        </ScrollArea>
        <div className="p-6 border-t border-white border-opacity-20">
          <div className="flex items-center">
            <Input placeholder="Enter a prompt here..." className="flex-1 mr-3 rounded-2xl bg-white bg-opacity-10 border-none focus:ring-2 focus:ring-purple-400" />
            <Button size="icon" className="rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300">
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <div className="flex items-center cursor-pointer hover:text-purple-400 transition-colors duration-300">
              <Download className="h-5 w-5 mr-2" />
              <span>Download chat</span>
            </div>
            <div className="flex items-center cursor-pointer hover:text-purple-400 transition-colors duration-300">
              <RefreshCw className="h-5 w-5 mr-2" />
              <span>Regenerate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;