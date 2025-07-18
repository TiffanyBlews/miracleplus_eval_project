import { Dataset } from '../types';

export const palindromeSearch = {
  id: 'palindrome-search',
  name: '长文本回文串检索',
  description: '在长上下文噪声环境下检索回文串的推理能力测试，考验模型的长文本处理和模式识别能力',
  category: 'basic',
  taskType: '长文本推理',
  samples: 51, // 真实题目组数
  difficulty: '中等',
  metrics: ['微观成功率', '微观正确率', '宏观成功率', '宏观正确率'],
  detailedDescription: '本数据集包含51组题目（共299个回文串），每题为三元组 (字符串长度, 回文串数量, 回文串长度)。字符串长度：[100, 300, 500, 700, 1000, 3000]，回文串数量：[3, 5, 10]，回文串长度：[5, 10, 20]。排除三组：(100,5,20)、(100,10,10)、(100,10,20)。',
  keyFeatures: [
    '长上下文推理能力',
    '噪声环境抗干扰',
    '自我认知能力',
    '推理效率评估',
    '多尺度回文检测'
  ],
  evaluationCriteria: [
    '微观/宏观成功率',
    '微观/宏观正确率',
    '推理效率',
    '抗噪声能力'
  ],
  sampleTask: '在包含多个回文串的长文本中，准确找出所有嵌入的回文串，并标注其位置',
  chartData: {
    difficultyDistribution: [
      { label: '字符串长度 100-500', value: 10, color: '#10B981' },
      { label: '字符串长度 700-1000', value: 30, color: '#F59E0B' },
      { label: '字符串长度 3000', value: 11, color: '#EF4444' }
    ],
    taskTypeDistribution: [
      { label: '回文串长度 5', value: 20, color: '#3B82F6' },
      { label: '回文串长度 10', value: 20, color: '#8B5CF6' },
      { label: '回文串长度 20', value: 11, color: '#F59E0B' }
    ],
    performanceMetrics: []
  }
}; 