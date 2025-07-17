import React from 'react';

interface OverviewSectionProps {
  overview: {
    totalSamples: number;
    totalImages: number;
    questionTypes: { type: string; count: number }[];
    abilityDimensions: { dimension: string; count: number }[];
  };
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">数据集覆盖与能力维度</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-2 text-gray-700">样本总数：<span className="font-bold">{overview.totalSamples}</span></div>
          <div className="mb-2 text-gray-700">图片总数：<span className="font-bold">{overview.totalImages}</span></div>
          <div className="mb-2 text-gray-700">题型分布：</div>
          <ul className="ml-4 list-disc text-gray-600">
            {overview.questionTypes.map((q, idx) => (
              <li key={idx}>{q.type}：{q.count}道</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 text-gray-700">能力维度分布：</div>
          <ul className="ml-4 list-disc text-gray-600">
            {overview.abilityDimensions.map((a, idx) => (
              <li key={idx}>{a.dimension}：{a.count}题</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 