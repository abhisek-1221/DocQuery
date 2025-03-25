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
    <div className="bg-black text-white max-h-screen">
      <div className="flex items-start gap-3 mb-2 px-4 pt-2 pb-1 max-w-full">
        <div className="text-sm text-gray-400 flex-shrink-0 pt-0.5">
          {message.role === "user" ? "You" : "Assistant"}
        </div>
        {message.role === "user" && (
          <div className="text-sm flex-grow overflow-hidden">
            <div className="break-words text-lg font-bold">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {message.toolInvocations?.map((tool) => {
        const { toolName, toolCallId, state } = tool;

        if (state === "result" && toolName === "searchEcommerce") {
          return (
            <div key={toolCallId} className="w-full">
              <div className="mb-3 px-4">
                <h3 className="text-4xl font-bold mb-2">
                  {tool.result.query}
                </h3>
                
                <div className="flex border-b border-gray-800 mb-3">
                  <div className="flex items-center space-x-3 mb-0">
                    <button className="flex items-center px-2 py-3 border-b-2 border-white text-white">
                      <span className="material-icons mr-1">🔍</span>
                      <span>Answer</span>
                    </button>
                    <button className="flex items-center px-2 py-3 text-gray-400">
                      <span className="material-icons mr-1">🖼️</span>
                      <span>Images</span>
                    </button>
                    <button className="flex items-center px-2 py-3 text-gray-400">
                      <span className="material-icons mr-1">📚</span>
                      <span>Sources</span>
                      <span className="ml-1 px-1 text-xs rounded-sm bg-gray-700">8</span>
                    </button>
                  </div>
                  <div className="ml-auto flex items-center">
                    <Badge variant="outline" className="bg-gray-800 text-white">
                      {tool.result.results.length} results
                    </Badge>
                  </div>
                </div>
              </div>

              {tool.result.error && (
                <Card className="border-red-900 bg-red-950/50 mx-4">
                  <CardContent className="pt-6">
                    <p className="text-red-500">{tool.result.error}</p>
                  </CardContent>
                </Card>
              )}

              <div className="mx-4">
                <div className="flex mb-3 gap-2 overflow-x-auto">
                  {tool.result.results.slice(0, 4).map((source: any, index: number) => (
                    <div key={index} className="flex-shrink-0 px-3 py-2 bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs mr-2">
                          {source.icon || (index === 0 ? "🌐" : index === 1 ? "💰" : index === 2 ? "📱" : "📱")}
                        </span>
                        <span className="text-sm font-medium">
                          {source.name || source.title || `Source ${index + 1}`}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {source.description || source.text?.substring(0, 60) || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative px-4">
                <div className="relative mb-6">
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
                        key={product.id || Math.random().toString()} 
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
                
                <div className="text-xl mb-4">
                  <ReactMarkdown 
                    components={{
                      // Define custom components with proper Tailwind classes
                      p: ({node, ...props}) => <p className="mb-4" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-3 mt-4" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2 mt-3" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 mt-3" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-8 mb-4 mt-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-8 mb-4 mt-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                      em: ({node, ...props}) => <em className="italic" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="pl-4 border-l-4 border-gray-700 italic my-4" {...props} />,
                      code: ({node, ...props}) => <code className="bg-gray-800 px-1 rounded" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-gray-800 p-3 rounded my-4 overflow-x-auto" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-400 underline" {...props} />
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>

                {/* Conditionally render the product list */}
                {(!message.content || message.content.length < 100) && (
                  <ul className="list-disc pl-8 space-y-6 mb-4">
                    {tool.result.results.slice(0, 2).map((product: any, index: number) => (
                      <li key={product.id || index} className="pb-6">
                        <div className="font-bold text-xl mb-2">
                          {product.title || `Product ${index + 1}`}
                        </div>
                        
                        <ul className="list-disc pl-8 space-y-2">
                          {product.price && (
                            <li>
                              <span className="font-semibold">Price:</span> {product.price}
                            </li>
                          )}
                          {product.publishedDate && (
                            <li>
                              <span className="font-semibold">Launch Date:</span> {formatDate(product.publishedDate)}
                            </li>
                          )}
                          {product.features && (
                            <li>
                              <span className="font-semibold">Key Features:</span>
                              <ul className="list-disc pl-8 space-y-1 mt-1">
                                {Object.entries(product.features).map(([key, value], i) => (
                                  <li key={i}>{key}: {String(value)}</li>
                                ))}
                              </ul>
                            </li>
                          )}
                          {product.text && !product.features && (
                            <li>
                              <span className="font-semibold">Description:</span> {truncateText(product.text, 200)}
                            </li>
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4">
                  <div className="flex items-center text-gray-400">
                    <button className="flex items-center px-3 py-2 rounded-full border border-gray-700 hover:bg-gray-800">
                      <span className="material-icons mr-2">💬</span>
                      <span>Ask follow-up</span>
                    </button>
                    <button className="ml-auto p-2 text-gray-500 hover:text-gray-400">
                      <span className="material-icons">📎</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-400">
                      <span className="material-icons">⬆️</span>
                    </button>
                  </div>
                </div>
              </div>

              {tool.result.results.length === 0 && !tool.result.error && (
                <Card className="border-yellow-900 bg-yellow-950/50 mx-4">
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
            <div key={toolCallId} className="w-full">
              <div className="mb-3 px-4">
                <div className="h-10 w-2/3 bg-gray-800 rounded-md animate-pulse mb-2"></div>
                
                <div className="flex border-b border-gray-800 mb-3">
                  <div className="flex items-center space-x-3 mb-0">
                    <div className="h-8 w-24 bg-gray-800 rounded-md animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-800 rounded-md animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-800 rounded-md animate-pulse"></div>
                  </div>
                  <div className="ml-auto">
                    <div className="h-6 w-24 bg-gray-800 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="mx-4">
                <div className="flex mb-3 gap-2 overflow-x-auto">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="flex-shrink-0 px-3 py-2 bg-gray-900 rounded-lg animate-pulse">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-800 rounded-full mr-2"></div>
                        <div className="h-4 w-24 bg-gray-800 rounded-md"></div>
                      </div>
                      <div className="h-3 w-36 bg-gray-800 rounded-md mt-1"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative px-4">
                <div className="relative">
                  <div className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4 no-scrollbar mb-6">
                    {[1, 2, 3, 4].map((item) => (
                      <div 
                        key={item} 
                        className="flex-shrink-0 w-80 scroll-snap-align-start"
                      >
                        <Card className="bg-gray-950 border-gray-800 h-full animate-pulse">
                          <CardHeader className="pb-2">
                            <div className="h-6 w-full bg-gray-800 rounded-md mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-800 rounded-md"></div>
                          </CardHeader>
                          
                          <CardContent className="text-sm text-gray-300">
                            <div className="space-y-4">
                              <div className="w-full h-48 bg-gray-800 rounded-md"></div>
                              <div className="h-4 w-full bg-gray-800 rounded-md"></div>
                              <div className="h-4 w-3/4 bg-gray-800 rounded-md"></div>
                              <div className="h-6 w-1/3 bg-gray-800 rounded-md"></div>
                            </div>
                          </CardContent>
                          
                          <CardFooter className="pt-2 border-t border-gray-800">
                            <div className="h-3 w-full bg-gray-800 rounded-md"></div>
                          </CardFooter>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="h-6 w-full bg-gray-800 rounded-md animate-pulse mb-3"></div>

                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="h-8 w-32 bg-gray-800 rounded-full animate-pulse"></div>
                    <div className="ml-auto flex">
                      <div className="h-6 w-6 bg-gray-800 rounded-md mx-1"></div>
                      <div className="h-6 w-6 bg-gray-800 rounded-md mx-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}