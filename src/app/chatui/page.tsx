import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Search, Folder, Star, Archive, Settings, HelpCircle, Send, Download, RefreshCw } from 'lucide-react';

interface RadialChartProps {
  data: { name: string; value: number; color: string }[];
}

const RadialChart = ({ data }: RadialChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="45" fill="#1a1a1a" />
      {data.map((item, index) => {
        const angle = (item.value / total) * 360;
        const endAngle = startAngle + angle;
        const largeArcFlag = angle > 180 ? 1 : 0;
        const startRadians = (startAngle * Math.PI) / 180;
        const endRadians = (endAngle * Math.PI) / 180;
        const x1 = 50 + 45 * Math.cos(startRadians);
        const y1 = 50 + 45 * Math.sin(startRadians);
        const x2 = 50 + 45 * Math.cos(endRadians);
        const y2 = 50 + 45 * Math.sin(endRadians);

        const pathData = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        const midAngle = startAngle + angle / 2;
        const labelRadius = 30;
        const labelX = 50 + labelRadius * Math.cos((midAngle * Math.PI) / 180);
        const labelY = 50 + labelRadius * Math.sin((midAngle * Math.PI) / 180);

        startAngle = endAngle;

        return (
          <g key={index}>
            <path d={pathData} fill={item.color} />
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              fill="white"
              fontSize="3"
              dominantBaseline="middle"
            >
              {item.name}
            </text>
          </g>
        );
      })}
      <circle cx="50" cy="50" r="25" fill="#1a1a1a" />
      <text x="50" y="50" textAnchor="middle" fill="white" fontSize="6" dominantBaseline="middle">
        Total
      </text>
      <text x="50" y="57" textAnchor="middle" fill="white" fontSize="5" dominantBaseline="middle">
        ${total.toLocaleString()}
      </text>
    </svg>
  );
};

const data = [
  { name: 'Sales', value: 45000, color: '#FF6384' },
  { name: 'Marketing', value: 15000, color: '#36A2EB' },
  { name: 'R&D', value: 20000, color: '#FFCE56' },
  { name: 'Operations', value: 30000, color: '#4BC0C0' },
  { name: 'Admin', value: 10000, color: '#9966FF' },
];

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
                <p>From the submitted data Generate a breakdown of our company's spending across different departments</p>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-gray-700 bg-opacity-70 rounded-2xl p-4 max-w-[80%] w-full">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-semibold mb-2">Company Spending Breakdown</h2>
                  <p className="text-sm mb-4">Here's a breakdown of the company's spending across different departments:</p>
                  <div className="w-full h-64">
                    <RadialChart data={data} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {data.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}: ${item.value.toLocaleString()}</span>
                      </div>
                    ))}
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