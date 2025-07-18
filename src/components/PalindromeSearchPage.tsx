import React from 'react';
import { palindromeSearch } from '../datasets/palindromeSearch';
import { leaderboardData } from '../datasets/palindromeLeaderboard';

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

export default function PalindromeSearchPage({ setSelectedDataset }: { setSelectedDataset: (id: string | null) => void }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <button className="mb-4 text-blue-600" onClick={() => setSelectedDataset(null)}>
        返回
      </button>
      <h2 className="text-2xl font-bold mb-2">模型上下文窗口噪声推理测试：无代码寻找回文串</h2>
      <p className="mb-4 text-gray-700">
        我们通过一个“无代码寻找回文串”的挑战，来测试大模型的真实推理、长上下文处理和自我认知能力，这些是成为可靠AI智能体（Agent）的基础。
      </p>
      <div className="mb-4 text-gray-800">
        <b>实验材料：</b> 51组题目（共299个回文串），每题为三元组 (字符串长度, 回文串数量, 回文串长度)，<br/>
        字符串长度：{datasetStats.lengths.join('，')}，回文串数量：{datasetStats.nums.join('，')}，回文串长度：{datasetStats.pLens.join('，')}。<br/>
        排除三组：{datasetStats.removed.map(t => `(${t.join(',')})`).join('，')}。<br/>
      </div>
      <div className="mb-4 text-gray-800">
        <b>任务说明：</b> 模型需在长文本噪声环境下，准确找出所有嵌入的回文串。<br/>
        <b>评测维度：</b> 推理效率、长上下文处理与幻觉、自我认知能力。
      </div>
      <div className="mb-4 text-gray-800">
        <b>实验结论：</b><br/>
        我们发现效率差距悬殊，grok4能做对大部分问题，准确率最高，一些模型（如 Qwen、Deepseek）在尝试暴力枚举时，会因上下文过长而“遗忘”信息，导致结果不完整，最后给出错误答案也不自知。<br/>
        本任务旨在通过“无代码寻找回文串”的挑战，从三个层面严格评估大模型的核心能力：<br/>
        <ul className="list-disc ml-6">
          <li>推理效率：评估模型在面对问题时，是依赖低效的暴力枚举，还是能够模拟出更高效的算法进行解题。</li>
          <li>长上下文处理与幻觉：测试模型在处理长且杂乱的信息时，能否准确找到目标回文串，抑或出现信息遗漏与凭空捏造的幻觉。</li>
          <li>自我认知能力：考察模型在无法完成任务时，是否能够坦诚承认自身的局限，而非生成错误且看似合理的幻觉答案。</li>
        </ul>
        这三项能力是大模型在执行 Agent 任务时的基础。实际应用中，Agent 常常需要在长链路推理过程中调用外部工具，而回文串查找可被视作一种具备长链路与长上下文推理特征的简化任务。若模型能够在回文串任务中展现出优秀的推理、上下文处理与自我认知能力，将有助于预测其在更复杂 Agent 任务上的泛化表现。
      </div>
      <div className="overflow-x-auto mt-8">
        <h3 className="text-xl font-semibold mb-2">排行榜（微观/宏观平均）</h3>
        {/* <pre>{JSON.stringify(leaderboardData, null, 2)}</pre> */}
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
            {leaderboardData
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