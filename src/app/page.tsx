import { AnimatedGradientTextDemo } from '@/components/agtext';
import { AnimatedListDemo } from '@/components/Animatedlist';
import { FeaturesSectionDemo } from '@/components/bentogrid';
import { Homie } from '@/components/Homie';
import PricingPage from '@/components/pricing';
import RadarPreview from '@/components/RadarPreview';
import React from 'react';

export default async function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 z-[-2] h-full w-full bg-[radial-gradient(ellipse_70%_30%_at_40%_-20%,rgba(240,67,12,0.4),rgba(18,10,9,1))]"
        aria-hidden="true"
      />
      
      {/* Gradient Text Demo */}
      <div className="flex items-center justify-center dark">
        <AnimatedGradientTextDemo />
      </div>
      
      {/* Main Content Grid */}
      <div className="relative px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
          {/* Homie Component */}
          <div className="flex flex-col items-center gap-6 text-center">
            <Homie />
          </div>
          
          {/* Animated List Demo */}
          <div className="max-h-[500px] min-h-[500px] overflow-hidden [mask-image:linear-gradient(to_bottom,white,white,transparent)]">
            <div className="flex flex-col items-center gap-4">
              <AnimatedListDemo />
            </div>
          </div>
        </div>
      </div>

      {/* Radar Preview Section */}
      <div className="mt-20 overflow-hidden px-4 md:px-8">
        <RadarPreview />
      </div>

      {/* GenAI Ecommerce Search Engine Feature */}
      <div className="mt-16 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-6">GenAI Ecommerce Search Engine</h2>
        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.tella.tv/video/cm8osj50r001q0ajs2n070qgh/embed?b=0&title=0&a=0&loop=1&t=0&muted=0&wt=0"
              allowFullScreen
              allowTransparency
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <FeaturesSectionDemo />
      </div>
      <div className='flex justify-center items-center'>
        <PricingPage />
      </div>
    </div>
  );
}
