import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Search, Folder, Star, Archive, Settings, HelpCircle, Send, Download, RefreshCw } from 'lucide-react';

const data = [
  { name: 'May', value: 90000 },
  { name: 'Jun', value: 85000 },
  { name: 'Jul', value: 82000 },
  { name: 'Aug', value: 78000 },
  { name: 'Sep', value: 75000 },
];
const BarChart = ({ data }: { data: { name: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = 100 / data.length;

  return (
    <svg viewBox="0 0 100 50" className="w-full h-full">
      {data.map((item, index) => (
        <g key={index}>
          <rect
            x={index * barWidth}
            y={50 - (item.value / maxValue) * 50}
            width={barWidth - 1}
            height={(item.value / maxValue) * 50}
            fill="#8884d8"
          />
          <text
            x={index * barWidth + barWidth / 2}
            y="52"
            textAnchor="middle"
            fontSize="3"
            fill="white"
          >
            {item.name}
          </text>
        </g>
      ))}
    </svg>
  );
};

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
            <img src="https://avatars.githubusercontent.com/u/110292494?v=4" alt="User" className="w-10 h-10 rounded-full mr-3" />
            <span>Abhisek Sahoo</span>
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
              <img src="https://avatars.githubusercontent.com/u/110292494?v=4" alt="User" className="w-10 h-10 rounded-full mr-3" />
              <div className="bg-white bg-opacity-10 rounded-2xl p-4 max-w-[80%]">
                <p>From the submitted data generate Dashboard analytics of sales report of past 5 months & update traffic in CMS</p>
              </div>
            </div>
            <div className="flex items-start justify-end">
              
              <div className="bg-gray-700 bg-opacity-70 rounded-2xl p-4 max-w-[80%] w-full">
                <p className='font-mono'>Hold on! Generating Dashboard Analytics....</p>
                <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-semibold mb-2">Monthly Spending</h2>
                  <p className="text-3xl font-bold mb-1">$83,465</p>
                  <p className="text-sm text-gray-400 mb-4">Current Balance</p>
                  <p className="text-sm mb-2">Past 5 months</p>
                  <p className="text-sm text-gray-400 mb-4">May - September</p>
                  <div className="w-full h-48">
                    <BarChart data={data} />
                  </div>
                </div>
                <p className="text-sm text-gray-400">Last Updated 26 June, 2024</p>
              </div>
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