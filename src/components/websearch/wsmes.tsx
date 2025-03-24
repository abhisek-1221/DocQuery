"use client";

import React, { useRef } from "react";
import type { Message } from "ai";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from 'react-markdown'

export default function MessageWS({ message }: { message: Message }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Function to extract and format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength = 300) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Scroll carousel functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-sm text-gray-400">
          {message.role === "user" ? "You" : "Assistant"}
        </div>
        <div className="text-sm">
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>

      {message.toolInvocations?.map((tool) => {
        const { toolName, toolCallId, state } = tool;

        if (state === "result" && toolName === "searchEcommerce") {
          return (
            <div key={toolCallId} className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">
                  Search Results for "{tool.result.query}"
                </h3>
                <Badge variant="outline" className="bg-gray-800 text-white">
                  {tool.result.results.length} results
                </Badge>
              </div>

              {tool.result.error && (
                <Card className="border-red-900 bg-red-950/50">
                  <CardContent className="pt-6">
                    <p className="text-red-500">{tool.result.error}</p>
                  </CardContent>
                </Card>
              )}

              <div className="relative">
                {tool.result.results.length > 3 && (
                  <button 
                    onClick={scrollLeft} 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronLeft className="text-white" />
                  </button>
                )}

                <div 
                  ref={carouselRef}
                  className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4 no-scrollbar"
                  style={{ 
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none'
                  }}
                >
                  {tool.result.results.map((product: any) => (
                    <div 
                      key={product.id} 
                      className="flex-shrink-0 w-80 scroll-snap-align-start"
                    >
                      <Card className="bg-gray-950 border-gray-800 hover:border-gray-700 transition duration-300 h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl font-semibold text-white line-clamp-2">
                            {product.title || "Untitled Product"}
                          </CardTitle>
                          <CardDescription className="text-gray-500">
                            {formatDate(product.publishedDate)}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="text-sm text-gray-300">
                          <div className="space-y-4">
                            {product.extras?.imageLinks && product.extras.imageLinks.length > 0 && (
                              <img
                                src={product.extras.imageLinks[0] || "/api/placeholder/300/200"}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-md"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/api/placeholder/300/200";
                                }}
                              />
                            )}
                            
                            <p className="mb-4">{truncateText(product.text)}</p>
                            
                            {product.extras?.links && product.extras.links.length > 0 && (
                              <div>
                                <Badge variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                                  <a 
                                    href={product.url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1"
                                  >
                                    View Product <ExternalLink size={14} />
                                  </a>
                                </Badge>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-2 border-t border-gray-800 flex justify-between">
                          <p className="text-xs text-gray-500 truncate">{product.url}</p>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>

                {tool.result.results.length > 3 && (
                  <button 
                    onClick={scrollRight} 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronRight className="text-white" />
                  </button>
                )}
              </div>

              {tool.result.results.length === 0 && !tool.result.error && (
                <Card className="border-yellow-900 bg-yellow-950/50">
                  <CardContent className="pt-6">
                    <p className="text-yellow-500">No results found. Try a different search query.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          );
        }

        if (state !== "result" && toolName === "searchEcommerce") {
          return (
            <Card key={toolCallId} className="border-blue-900 bg-blue-950/50">
              <CardContent className="pt-6 flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                <p className="text-blue-500">Searching for products...</p>
              </CardContent>
            </Card>
          );
        }
      })}
    </div>
  );
}