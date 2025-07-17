import React, { useState } from 'react';
import { financialPoster, financialPosterCaseStudies } from '../datasets/financialPoster';

export default function FinancialPosterPage({ setSelectedDataset }: { setSelectedDataset: (id: string | null) => void }) {
  const [tab, setTab] = useState<'total' | 'choice' | 'openEnded' | 'fillBlank'>('total');
  const { detailedResults } = financialPoster;

  // 生成排行榜数据
  let rankingData: any[] = [];
  if (tab === 'total') {
    rankingData = detailedResults.rankings.map((item: any) => ({
      model: item.model,
      provider: item.provider,
      score: item.score
    }));
  } else {
    rankingData = detailedResults.taskPerformance.map((item: any) => ({
      model: item.model,
      provider: item.provider,
      score:
        tab === 'choice' ? item.choice :
        tab === 'openEnded' ? item.openEnded :
        item.fillBlank
    }));
  }
  rankingData = rankingData.sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <button className="mb-4 text-blue-600" onClick={() => setSelectedDataset(null)}>
        返回
      </button>
      <h2 className="text-2xl font-bold mb-2">{financialPoster.name}</h2>
      <p className="mb-4 text-gray-700">{financialPoster.detailedDescription}</p>
      {/* 排行榜切换Tab */}
      <div className="flex space-x-2 mb-4">
        <button className={`px-3 py-1 rounded ${tab === 'total' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setTab('total')}>总分排行榜</button>
        <button className={`px-3 py-1 rounded ${tab === 'choice' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setTab('choice')}>选择题排行榜</button>
        <button className={`px-3 py-1 rounded ${tab === 'openEnded' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setTab('openEnded')}>开放题排行榜</button>
        <button className={`px-3 py-1 rounded ${tab === 'fillBlank' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setTab('fillBlank')}>填空题排行榜</button>
      </div>
      {/* 排行榜表格 */}
      <table className="w-full mb-6 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">模型</th>
            <th className="p-2">提供商</th>
            <th className="p-2">分数</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((item, idx) => (
            <tr key={item.model} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="p-2 font-medium">{item.model}</td>
              <td className="p-2">{item.provider}</td>
              <td className="p-2">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 案例分析 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">案例分析</h3>
        <ul className="space-y-2">
          {financialPosterCaseStudies.map(cs => (
            <li key={cs.id} className="border rounded p-2">
              <div className="font-medium">{cs.title}</div>
              <div className="text-sm text-gray-600">{cs.content}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 