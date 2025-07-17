import React from 'react';

interface MetricBarProps {
  metric: string;
  average: number;
  top: number;
}

export default function MetricBar({ metric, average, top }: MetricBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{metric}</span>
        <span className="text-sm text-gray-600">最高: {top}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-600 h-3 rounded-full relative" style={{ width: `${average}%` }}>
          <div
            className="absolute top-0 right-0 w-1 h-3 bg-green-500 rounded-r-full"
            style={{ right: `${100 - top}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>平均: {average}%</span>
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
} 