import { Dataset } from '../types';

export const palindromeSearch: Dataset = {
  id: 'palindrome-search',
  name: '长文本回文串检索',
  description: '在长上下文噪声环境下检索回文串的推理能力测试，考验模型的长文本处理和模式识别能力',
  category: 'basic',
  taskType: '长文本推理',
  samples: 1800,
  difficulty: '中等',
  metrics: ['检索准确率', '抗噪能力', '长文本理解'],
  detailedDescription: '该数据集包含1800个长文本样本，每个样本长度在5K-50K字符之间，其中嵌入了多个回文串。文本内容包含大量噪声信息和干扰项，要求模型能够在复杂的上下文环境中准确识别和定位回文串。测试涵盖不同长度的回文串检索，从简单的3字符回文到复杂的50+字符回文。',
  keyFeatures: [
    '超长上下文处理',
    '噪声环境抗干扰',
    '模式识别能力',
    '精确定位能力',
    '多尺度回文检测'
  ],
  evaluationCriteria: [
    '检索准确率 (40%)',
    '召回率 (30%)',
    '抗噪声能力 (20%)',
    '处理效率 (10%)'
  ],
  sampleTask: '在包含15K字符的技术文档中，准确识别所有长度≥5的回文串，并标注其位置',
  chartData: {
    difficultyDistribution: [
      { label: '简单', value: 30, color: '#10B981' },
      { label: '中等', value: 45, color: '#F59E0B' },
      { label: '困难', value: 25, color: '#EF4444' }
    ],
    taskTypeDistribution: [
      { label: '短回文(3-10)', value: 35, color: '#3B82F6' },
      { label: '中回文(11-25)', value: 40, color: '#8B5CF6' },
      { label: '长回文(26-50)', value: 20, color: '#F59E0B' },
      { label: '超长回文(50+)', value: 5, color: '#EF4444' }
    ],
    performanceMetrics: []
  }
}; 