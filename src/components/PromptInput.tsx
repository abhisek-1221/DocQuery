"use client"

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { Button } from "@/components/ui/button"
import { ArrowUp, Paperclip, Send, Square, X } from "lucide-react"
import { useState } from "react"

interface PromptInputWithActionsProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isAssistantTyping: boolean
}

export function PromptInputWithActions({ 
  input, 
  handleInputChange, 
  handleSubmit, 
  isAssistantTyping 
}: PromptInputWithActionsProps) {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onValueChange = (value: string) => {
    // Create a synthetic event to match the original handler
    const syntheticEvent = {
      target: { value }
    } as React.ChangeEvent<HTMLTextAreaElement>
    
    handleInputChange(syntheticEvent)
  }

  const onSubmitWrapper = () => {
    // Create a synthetic form event
    const syntheticEvent = {
      preventDefault: () => {}
    } as React.FormEvent
    
    handleSubmit(syntheticEvent)
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit(e)
    }} className="flex-shrink-0 p-3 sm:p-6 bg-gradient-to-r from-stone-900 via-[#0a0303] to-black rounded-b-lg border-t border-gray-200 border-opacity-20">
      <PromptInput
        value={input}
        onValueChange={onValueChange}
        isLoading={isAssistantTyping}
        onSubmit={onSubmitWrapper}
        className="bg-transparent"
      >
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white"
              >
                <Paperclip className="size-4" />
                <span className="max-w-[120px] truncate">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="hover:bg-white/10 rounded-full p-1"
                  type="button"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <PromptInputTextarea 
          placeholder="Enter a prompt here..." 
          className="text-base sm:text-lg text-white placeholder-gray-300 bg-opacity-20 focus:bg-opacity-30 transition-all duration-300"
        />

        <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
          <PromptInputAction tooltip="Attach files">
            <label
              htmlFor="file-upload"
              className="hover:bg-white/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Paperclip className="size-5 text-white" />
            </label>
          </PromptInputAction>

          <PromptInputAction tooltip="Send message">
            <Button
              size="sm" 
              type="submit" 
              className="rounded-full bg-[#231513] hover:bg-opacity-80 transition-colors duration-300 px-4 sm:px-6 py-2 sm:py-3"
              disabled={isAssistantTyping}
            >
              <Send className="h-4 w-2S sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            </Button>
          </PromptInputAction>
        </PromptInputActions>
      </PromptInput>
    </form>
  )
}