"use client";

import React, { useRef, useEffect } from "react";
import MessageWS from "@/components/websearch/wsmes";
import { useChat } from "ai/react";
import { Send, RefreshCw, Zap } from "lucide-react";

export default function Home() {
  const { input, handleInputChange, handleSubmit, messages, isLoading } = useChat({
    api: '/api/chat',
    body: {
      feature: 'websearch'
    },
  });

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-black text-white max-w-4xl mx-auto shadow-2xl">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap className="text-blue-500" size={24} />
          <h1 className="text-xl font-bold text-white">AI Search Assistant</h1>
        </div>
        {isLoading && (
          <RefreshCw className="animate-spin text-blue-500" size={20} />
        )}
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-black p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col justify-center items-center text-center text-gray-500">
            <Zap className="mx-auto mb-4 text-blue-500" size={48} />
            <p className="text-xl">Start a conversation with your AI assistant</p>
            <p className="text-sm text-gray-600 mt-2">Ecommerce Web Search engine</p>
          </div>
        )}
        {messages.map((message) => (
          <MessageWS key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-black">
        <form 
          onSubmit={handleSubmit} 
          className="flex items-center bg-gray-900 rounded-full border border-gray-600 focus-within:border-blue-600 transition-all duration-300"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything about ecommerce..."
            className="flex-1 p-3 bg-black text-white placeholder-gray-500 outline-none text-md"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || input.trim() === ''}
            className="p-3 text-blue-500 hover:text-blue-400 disabled:text-gray-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
        
        {/* Hint Text */}
        <p className="text-xs text-gray-600 text-center mt-2">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}