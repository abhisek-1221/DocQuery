"use client";

import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

interface WeatherProps {
  location: string;
  temperature: number;
  weather: string;
  toolCallId: string;
}

export function Weather({ location, temperature, weather, toolCallId }: WeatherProps) {
  const weatherIcons: Record<string, JSX.Element> = {
    Sunny: <WiDaySunny className="text-yellow-400 text-5xl" />,
    Cloudy: <WiCloudy className="text-gray-400 text-5xl" />,
    Rainy: <WiRain className="text-blue-400 text-5xl" />,
    Snowy: <WiSnow className="text-blue-200 text-5xl" />,
    Thunderstorm: <WiThunderstorm className="text-purple-500 text-5xl" />,
  };

  return (
    <div
      key={toolCallId}
      className="p-6 w-full max-w-sm mx-auto rounded-2xl shadow-lg transition-all bg-gradient-to-br 
      from-blue-200 to-blue-400 text-white hover:shadow-2xl hover:scale-105"
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{location}</div>
        <div className="text-4xl font-bold">{temperature}°C</div>
      </div>

      <div className="flex items-center justify-center mt-4">
        {weatherIcons[weather] || <WiCloudy className="text-gray-300 text-5xl" />}
      </div>

      <div className="mt-2 text-center text-lg font-medium capitalize">{weather}</div>
    </div>
  );
}
