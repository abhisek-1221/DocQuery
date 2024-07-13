import { Homie } from '@/components/Homie';
import React from 'react';


export default async function Home() {
  return (
   <div className="w-screen min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Homie />
      </div>
      <div
    className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
    bg-[size:20px_20px]'
    aria-hidden='true'
/>
   </div>
  );
}
