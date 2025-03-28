import React from 'react';
import Image from 'next/image';

export default function Architecture() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 z-[-2] h-full w-full bg-[radial-gradient(ellipse_70%_30%_at_40%_-20%,rgba(240,67,12,0.4),rgba(18,10,9,1))]"
        aria-hidden="true"
      />
      
      {/* Architecture Header */}
      <div className="pt-20 pb-10 px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
          ThriftWise Architecture
        </h1>
        <p className="text-xl text-center max-w-3xl mx-auto text-gray-200 mb-10">
          A deep dive into how our AI-powered e-commerce search engine works
        </p>
      </div>
      
      {/* Architecture Diagram Video */}
      <div className="mt-4 px-4 md:px-8">
        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.tella.tv/video/cm8osj50r001q0ajs2n070qgh/embed?b=0&title=0&a=0&loop=1&autoPlay=true&t=0&muted=1&wt=0"
              allowFullScreen
              allowTransparency
            />
          </div>
        </div>
      </div>
      
      {/* Architecture Diagram Image */}
      <div className="mt-16 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">System Architecture Diagram</h2>
        <div className="max-w-5xl mx-auto bg-black/20 p-4 rounded-xl shadow-2xl border border-gray-800">
          <div className="relative" style={{ width: '100%', height: 'auto' }}>
            <Image 
              src="/arch.png" 
              alt="ThriftWise Architecture Diagram" 
              width={1920} 
              height={1080} 
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Architecture Overview */}
      <div className="mt-16 px-4 md:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">How ThriftWise Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Data Ingestion</h3>
            <p className="text-gray-300">Our system ingests product data from various sources, normalizes it, and prepares it for semantic search. This includes text descriptions, images, pricing, and availability information.</p>
          </div>
          
          <div className="bg-black/30 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">AI Processing</h3>
            <p className="text-gray-300">We use advanced AI models to understand product attributes, customer intent, and generate embeddings that capture semantic meaning beyond simple keyword matching.</p>
          </div>
          
          <div className="bg-black/30 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Natural Language Search</h3>
            <p className="text-gray-300">Users can search in natural language, asking for products exactly how they would describe them to another person. Our system understands context and intent.</p>
          </div>
          
          <div className="bg-black/30 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Real-time Results</h3>
            <p className="text-gray-300">Results are delivered instantly with high relevance, learning from user interactions to continuously improve search quality and product recommendations.</p>
          </div>
        </div>
        

      </div>
    </div>
  );
}
