import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leaderboardData } from '../datasets/palindromeSearch';
import { stringTasks } from '../datasets/stringTasks';

const datasetStats = {
  totalQuestions: 51,
  totalPalindromes: 299,
  lengths: [100, 300, 500, 700, 1000, 3000],
  nums: [3, 5, 10],
  pLens: [5, 10, 20],
  removed: [
    [100, 5, 20],
    [100, 10, 10],
    [100, 10, 20],
  ],
};

export default function StringTasksPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('palindrome-search');

  // 获取当前活跃任务的排行榜数据
  const getCurrentLeaderboard = () => {
    if (activeTab === 'palindrome-search') {
      return leaderboardData;
    }
    const currentTask = stringTasks.find(task => task.id === activeTab);
    return currentTask?.leaderboard || [];
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>
        返回
      </button>
      <h2 className="text-2xl font-bold mb-2">字符串处理任务评测：多维度推理能力测试</h2>
      <p className="mb-4 text-gray-700">
        通过多个字符串处理任务，全面测试大模型在文本分析、模式识别、序列处理等方面的推理能力和算法思维。
      </p>

      {/* 统一的任务描述 */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">任务概述</h3>
        <p className="mb-4 text-gray-700">
          我们通过多个字符串处理挑战，来测试大模型的真实推理、长上下文处理和自我认知能力，这些是成为可靠AI智能体（Agent）的基础。
        </p>
        <div className="mb-4 text-gray-800">
          <b>评测任务：</b> 包含隐藏信息提取、正则模式匹配、最长公共子序列查找、回文串检索、最少删除字符恢复回文等五个核心任务。
        </div>
        <div className="mb-4 text-gray-800">
          <b>评测维度：</b> 推理效率、长上下文处理与幻觉、自我认知能力、模式识别精度、算法思维。
        </div>
        <div className="mb-4 text-gray-800">
          <b>实验结论：</b> 通过多维度评测发现，不同模型在不同类型的字符串处理任务上表现差异显著，grok4在多个任务上表现优异，而一些模型在特定任务上存在明显的局限性。
        </div>
        <div className="mb-4 text-gray-800">
          <b>核心能力评估：</b><br/>
          <ul className="list-disc ml-6">
            <li>推理效率：评估模型在面对问题时，是依赖低效的暴力枚举，还是能够模拟出更高效的算法进行解题。</li>
            <li>长上下文处理与幻觉：测试模型在处理长且杂乱的信息时，能否准确找到目标信息，抑或出现信息遗漏与凭空捏造的幻觉。</li>
            <li>自我认知能力：考察模型在无法完成任务时，是否能够坦诚承认自身的局限，而非生成错误且看似合理的幻觉答案。</li>
            <li>模式识别能力：评估模型对复杂模式和结构的理解与识别能力。</li>
            <li>算法思维：测试模型是否具备优化思维和动态规划等算法思想。</li>
          </ul>
        </div>
      </div>

      {/* Tab导航 */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {stringTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setActiveTab(task.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === task.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {task.name}
            </button>
          ))}
        </nav>
      </div>

      {/* 排行榜 */}
      <div className="overflow-x-auto mt-8">
        <h3 className="text-xl font-semibold mb-2">{stringTasks.find(task => task.id === activeTab)?.name} - 排行榜（微观/宏观平均）</h3>
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">排名</th>
              <th className="px-4 py-2 text-left">模型</th>
              <th className="px-4 py-2 text-left">微观成功率</th>
              <th className="px-4 py-2 text-left">微观正确率</th>
              <th className="px-4 py-2 text-left">宏观成功率</th>
              <th className="px-4 py-2 text-left">宏观正确率</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentLeaderboard()
              .map((item, idx, arr) => ({ ...item, rank: idx + 1 }))
              .sort((a, b) => b.microCorrect - a.microCorrect) // 按微观正确率降序
              .map((item, idx) => (
                <tr key={item.model} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium">{item.model}</td>
                  <td className="px-4 py-2">{item.microSuccess.toFixed(2)}%</td>
                  <td className="px-4 py-2">{item.microCorrect.toFixed(2)}%</td>
                  <td className="px-4 py-2">{item.macroSuccess.toFixed(2)}%</td>
                  <td className="px-4 py-2">{item.macroCorrect.toFixed(2)}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 