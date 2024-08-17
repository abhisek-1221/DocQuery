import { AnimatedGradientTextDemo } from '@/components/agtext';
import { AnimatedListDemo } from '@/components/Animatedlist';
import { Homie } from '@/components/Homie';
import RadarPreview from '@/components/RadarPreview';
import React from 'react';

export default async function Home() {
  return (
    <div className="relative w-screen min-h-screen">
      <div
        className="absolute top-0 left-0 z-[-2] h-full w-full bg-[#000000] 
        bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
        aria-hidden="true"
      />
      <div className="flex items-center justify-center">
        <AnimatedGradientTextDemo />
      </div>
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col items-center gap-6 pb-8 pt-20 lg:pt-32 text-center">
            <Homie />
          </div>
          <div className="max-h-[500px] min-h-[500px] overflow-hidden [mask-image:linear-gradient(to_bottom,white,white,transparent)] ml-10 pb-8 lg:pt-32">
            <div className="flex flex-col items-center gap-4">
              <AnimatedListDemo />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <RadarPreview />
      </div>
    </div>
  );
}
