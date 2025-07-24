import React from 'react';
import { financialPoster } from '../datasets/financialPoster';
import PieChart from './PieChart';
import MetricBar from './MetricBar';
import OverviewSection from './OverviewSection';
import StatsCards from './StatsCards';
import { ArrowLeft, Award, CheckCircle, Target } from 'lucide-react';

export default function FinancialPosterPage({ setSelectedDataset }: { setSelectedDataset: (id: string | null) => void }) {
  const dataset = financialPoster;
  const leaderboard = dataset.detailedResults?.rankings || [];
  const caseStudies = dataset.focusAnalysis?.cases || [];
  const overview = dataset.backgroundInfo?.overview;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSelectedDataset(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{dataset.name}</h1>
          <p className="text-gray-600 mt-2">{dataset.description}</p>
        </div>
      </div>
      {/* 数据集概览 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">数据集概览</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">详细描述</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{dataset.detailedDescription}</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">核心特性</h3>
            <ul className="space-y-2">
              {dataset.keyFeatures.map((feature: string, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">评测标准</h3>
            <ul className="space-y-2 mb-6">
              {dataset.evaluationCriteria.map((criteria: string, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <Target className="text-blue-500" size={16} />
                  <span className="text-gray-600">{criteria}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">示例任务</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 italic">{dataset.sampleTask}</p>
            </div>
          </div>
        </div>
      </div>
      {/* 统计数字卡片 */}
      <StatsCards dataset={dataset} />
      {/* overview 能力分布 */}
      {overview && <OverviewSection overview={overview} />}
      {/* Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <PieChart data={dataset.chartData.difficultyDistribution} title="难度分布" />
        <PieChart data={dataset.chartData.taskTypeDistribution} title="任务类型分布" />
        {overview && (
          <>
            <PieChart 
              data={overview.questionTypes.map((q: { type: string; count: number }, idx: number) => ({
                label: q.type,
                value: q.count,
                color: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444'][idx % 5]
              }))} 
              title="题型分布" 
            />
            <PieChart 
              data={overview.abilityDimensions.map((a: { dimension: string; count: number }, idx: number) => ({
                label: a.dimension,
                value: a.count,
                color: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444'][idx % 5]
              }))} 
              title="能力维度分布" 
            />
          </>
        )}
      </div>
      {/* 性能指标（如果有的话） */}
      {dataset.chartData.performanceMetrics && dataset.chartData.performanceMetrics.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">性能指标</h3>
          <div className="space-y-4">
            {dataset.chartData.performanceMetrics.map((metric: { metric: string; average: number; top: number }, index: number) => (
              <MetricBar key={index} metric={metric.metric} average={metric.average} top={metric.top} />
            ))}
          </div>
        </div>
      )}
      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">排行榜</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">排名</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">模型</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">公司</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">综合得分</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">平均耗时 (s)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">总Token消耗</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((model: { 
                    model: string; 
                    provider: string; 
                    score: number;
                    averageTime?: number;
                    promptTokens?: number;
                    completionTokens?: number;
                }, index: number) => (
                  <tr key={model.model} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {index < 3 && (
                          <Award className={`mr-2 ${
                            index === 0 ? 'text-yellow-500' :
                            index === 1 ? 'text-gray-400' :
                            'text-orange-400'
                          }`} size={20} />
                        )}
                        <span className="font-semibold text-gray-900">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{model.model}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{model.provider}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {(model.score * 20).toFixed(0)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {model.averageTime?.toFixed(2) ?? 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {model.promptTokens && model.completionTokens
                        ? `${model.promptTokens + model.completionTokens} (${model.promptTokens}+${model.completionTokens})`
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* 案例分析 */}
      {caseStudies.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">案例分析</h2>
          <div className="space-y-12">
            {caseStudies.map((study: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-full">
                  {study.imageUrl && <img src={study.imageUrl} alt={study.title} className="rounded-lg shadow-lg object-contain w-full" />}
                </div>
                <div className="prose prose-lg max-w-none">
                  <h4 className="text-xl font-bold mb-4">{study.title}</h4>
                  <p className="text-gray-600" style={{ whiteSpace: 'pre-wrap' }}>{study.analysis || study.description || study.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 结论与展望（仅金融海报） */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">结论与展望</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">数据集的价值</h3>
            <p className="text-blue-100">
              金融海报推理数据集作为一个贴近真实应用场景的多模态数据集，能有效地区分出不同大模型在处理复杂、专业信息时的真实能力，
              特别是能够暴露"高分低能"的问题。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">模型的真实能力</h3>
            <p className="text-blue-100">
              Gemini 2.5 Pro 在本次测评中展现了目前最顶尖的金融图文理解和推理能力。与此同时，Grok-4 等模型在实际应用中的"幻觉"问题急需解决。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}