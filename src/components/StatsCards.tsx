import React from 'react';
import { Database, FileText, BarChart3, Target } from 'lucide-react';

interface StatsCardsProps {
  dataset: {
    samples: number;
    backgroundInfo?: {
      overview?: {
        totalSamples: number;
        totalImages: number;
        questionTypes: { type: string; count: number }[];
        abilityDimensions: { dimension: string; count: number }[];
      };
    };
  };
}

export default function StatsCards({ dataset }: StatsCardsProps) {
  const overview = dataset.backgroundInfo?.overview;
  const totalQuestions = overview?.questionTypes.reduce((sum, q) => sum + q.count, 0) || dataset.samples;
  const totalDimensions = overview?.abilityDimensions.length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="text-blue-600" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">样本总数</p>
            <p className="text-2xl font-bold text-gray-900">{overview?.totalSamples || dataset.samples}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="text-green-600" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">图片总数</p>
            <p className="text-2xl font-bold text-gray-900">{overview?.totalImages || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <BarChart3 className="text-purple-600" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">题型数量</p>
            <p className="text-2xl font-bold text-gray-900">{overview?.questionTypes.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Target className="text-orange-600" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">能力维度</p>
            <p className="text-2xl font-bold text-gray-900">{totalDimensions}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 