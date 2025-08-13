
import React from 'react';

interface MapViewProps {
  currentMap: string;
  currentFloor: string;
}

export function MapView({ currentMap, currentFloor }: MapViewProps) {
  const SvgMap = () => (
    <svg width="100%" height="100%" viewBox="0 0 1200 800" className="bg-gray-100 dark:bg-gray-800 rounded-lg">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(200,200,200,0.2)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Main workshop area */}
      <rect x="50" y="100" width="1100" height="600" fill="#E2E8F0" stroke="#A0AEC0" strokeWidth="2" />
      <text x="600" y="420" fontFamily="Verdana" fontSize="30" textAnchor="middle" fill="#666">
        第一轧钢车间 - 1F
      </text>

      {/* Different zones */}
      <rect x="70" y="120" width="300" height="560" fill="#F0F4F8" />
      <text x="220" y="400" textAnchor="middle" fill="#333">原料区</text>

      <rect x="390" y="120" width="400" height="560" fill="#E6EBF2" />
      <text x="590" y="400" textAnchor="middle" fill="#333">轧钢区</text>
      
      <rect x="810" y="120" width="320" height="270" fill="#F0F4F8" />
      <text x="970" y="265" textAnchor="middle" fill="#333">成品区 A</text>

      <rect x="810" y="410" width="320" height="270" fill="#F0F4F8" />
      <text x="970" y="555" textAnchor="middle" fill="#333">成品区 B</text>

      {/* Conveyor belts */}
      <path d="M 370 380 L 390 380" stroke="#6B7280" strokeWidth="4" strokeDasharray="8 4" />
      <path d="M 790 250 L 810 250" stroke="#6B7280" strokeWidth="4" strokeDasharray="8 4" />
      <path d="M 790 540 L 810 540" stroke="#6B7280" strokeWidth="4" strokeDasharray="8 4" />

      {/* Camera Icons */}
      <g transform="translate(100, 150)" className="cursor-pointer">
        <circle cx="0" cy="0" r="12" fill="#3B82F6" />
        <path d="M -5 -3 L 0 3 L 5 -3 Z" fill="white" />
        <title>摄像头 01</title>
      </g>
      <g transform="translate(600, 150)" className="cursor-pointer">
        <circle cx="0" cy="0" r="12" fill="#3B82F6" />
        <path d="M -5 -3 L 0 3 L 5 -3 Z" fill="white" />
        <title>摄像头 02</title>
      </g>
      <g transform="translate(1000, 150)" className="cursor-pointer">
        <circle cx="0" cy="0" r="12" fill="#3B82F6" />
        <path d="M -5 -3 L 0 3 L 5 -3 Z" fill="white" />
        <title>摄像头 03</title>
      </g>
       <g transform="translate(100, 650)" className="cursor-pointer">
        <circle cx="0" cy="0" r="12" fill="#3B82F6" />
        <path d="M -5 -3 L 0 3 L 5 -3 Z" fill="white" />
        <title>摄像头 04</title>
      </g>
      <g transform="translate(600, 650)" className="cursor-pointer">
        <circle cx="0" cy="0" r="12" fill="#EF4444" />
        <path d="M -5 -3 L 0 3 L 5 -3 Z" fill="white" />
        <title>摄像头 05 (异常)</title>
      </g>

      {/* Alert Icon */}
      <g transform="translate(900, 500)" className="cursor-pointer">
        <path d="M -15 15 L 0 -15 L 15 15 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fill="white" fontSize="20">!</text>
        <title>设备异常: 3号轧钢机</title>
      </g>
    </svg>
  );

  return (
    <div className="absolute inset-0 z-0">
      <SvgMap />
    </div>
  );
}
