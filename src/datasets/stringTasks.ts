import { Dataset } from '../types';
import { leaderboardData as palindromeLeaderboard } from './palindromeSearch';

// 隐藏信息提取任务
export const hiddenInfoTask = {
  id: 'hidden-info',
  name: '隐藏信息提取',
  description: '在长文本中提取隐藏的关键信息，测试模型的注意力机制和信息检索能力',
  category: 'string',
  taskType: '信息提取',
  samples: 45,
  difficulty: '中等',
  metrics: ['微观成功率', '微观正确率', '宏观成功率', '宏观正确率'],
  detailedDescription: '在包含大量噪声的长文本中，准确提取隐藏的关键信息片段，考验模型的注意力分配和信息过滤能力。',
  keyFeatures: [
    '注意力机制测试',
    '信息过滤能力',
    '噪声环境抗干扰',
    '精确信息定位'
  ],
  evaluationCriteria: [
    '微观/宏观成功率',
    '微观/宏观正确率',
    '信息提取精度',
    '抗噪声能力'
  ],
  sampleTask: '在长文本中找出隐藏的关键信息片段，并准确标注其位置和内容',
  chartData: {
    difficultyDistribution: [
      { label: '简单', value: 15, color: '#10B981' },
      { label: '中等', value: 20, color: '#F59E0B' },
      { label: '困难', value: 10, color: '#EF4444' }
    ],
    taskTypeDistribution: [
      { label: '数字信息', value: 20, color: '#3B82F6' },
      { label: '文本信息', value: 15, color: '#8B5CF6' },
      { label: '混合信息', value: 10, color: '#F59E0B' }
    ],
    performanceMetrics: []
  }
};

// 正则模式匹配任务
export const patternMatchingTask = {
  id: 'pattern-matching',
  name: '正则模式匹配',
  description: '使用正则表达式模式在文本中匹配特定结构，测试模型的模式识别能力',
  category: 'string',
  taskType: '模式匹配',
  samples: 38,
  difficulty: '困难',
  metrics: ['微观成功率', '微观正确率', '宏观成功率', '宏观正确率'],
  detailedDescription: '在复杂文本中识别和匹配各种正则表达式模式，包括邮箱、电话号码、日期格式等结构化信息。',
  keyFeatures: [
    '正则表达式理解',
    '模式识别能力',
    '结构化信息提取',
    '复杂规则处理'
  ],
  evaluationCriteria: [
    '微观/宏观成功率',
    '微观/宏观正确率',
    '模式匹配精度',
    '规则理解能力'
  ],
  sampleTask: '在文本中识别并提取符合特定正则表达式模式的所有匹配项',
  chartData: {
    difficultyDistribution: [
      { label: '基础模式', value: 12, color: '#10B981' },
      { label: '复杂模式', value: 18, color: '#F59E0B' },
      { label: '嵌套模式', value: 8, color: '#EF4444' }
    ],
    taskTypeDistribution: [
      { label: '邮箱匹配', value: 15, color: '#3B82F6' },
      { label: '日期匹配', value: 12, color: '#8B5CF6' },
      { label: '自定义模式', value: 11, color: '#F59E0B' }
    ],
    performanceMetrics: []
  }
};

// 最长公共子序列查找任务
export const subsequenceTask = {
  id: 'subsequence',
  name: '最长公共子序列查找',
  description: '在多个字符串中找出最长公共子序列，测试模型的序列分析和动态规划思维',
  category: 'string',
  taskType: '序列分析',
  samples: 42,
  difficulty: '困难',
  metrics: ['微观成功率', '微观正确率', '宏观成功率', '宏观正确率'],
  detailedDescription: '给定多个字符串，找出它们的最长公共子序列，考验模型的序列分析能力和算法思维。',
  keyFeatures: [
    '序列分析能力',
    '动态规划思维',
    '多字符串处理',
    '最优解搜索'
  ],
  evaluationCriteria: [
    '微观/宏观成功率',
    '微观/宏观正确率',
    '序列分析精度',
    '算法效率'
  ],
  sampleTask: '在给定的多个字符串中找出最长公共子序列，并返回其长度和内容',
  chartData: {
    difficultyDistribution: [
      { label: '短序列', value: 14, color: '#10B981' },
      { label: '中等序列', value: 18, color: '#F59E0B' },
      { label: '长序列', value: 10, color: '#EF4444' }
    ],
    taskTypeDistribution: [
      { label: '2个字符串', value: 20, color: '#3B82F6' },
      { label: '3个字符串', value: 15, color: '#8B5CF6' },
      { label: '4+个字符串', value: 7, color: '#F59E0B' }
    ],
    performanceMetrics: []
  }
};

// 最少删除字符恢复回文任务
export const palindromeRestoreTask = {
  id: 'palindrome-restore',
  name: '最少删除字符恢复回文',
  description: '通过最少字符删除将字符串转换为回文，测试模型的优化思维和回文理解',
  category: 'string',
  taskType: '回文优化',
  samples: 35,
  difficulty: '困难',
  metrics: ['微观成功率', '微观正确率', '宏观成功率', '宏观正确率'],
  detailedDescription: '给定一个字符串，通过删除最少数量的字符使其成为回文，考验模型的优化思维和回文结构理解。',
  keyFeatures: [
    '回文结构理解',
    '优化思维',
    '字符删除策略',
    '最小操作计算'
  ],
  evaluationCriteria: [
    '微观/宏观成功率',
    '微观/宏观正确率',
    '优化策略精度',
    '操作效率'
  ],
  sampleTask: '通过删除最少数量的字符将给定字符串转换为回文，并返回删除的字符数量',
  chartData: {
    difficultyDistribution: [
      { label: '短字符串', value: 12, color: '#10B981' },
      { label: '中等字符串', value: 15, color: '#F59E0B' },
      { label: '长字符串', value: 8, color: '#EF4444' }
    ],
    taskTypeDistribution: [
      { label: '简单回文', value: 18, color: '#3B82F6' },
      { label: '复杂回文', value: 12, color: '#8B5CF6' },
      { label: '嵌套回文', value: 5, color: '#F59E0B' }
    ],
    performanceMetrics: []
  }
};

// 各任务的排行榜数据
export const hiddenInfoLeaderboard = [
  {
    model: 'grok_4',
    microSuccess: 82.15,
    microCorrect: 78.92,
    macroSuccess: 80.00,
    macroCorrect: 75.56,
  },
  {
    model: 'claude_sonnet_4',
    microSuccess: 76.34,
    microCorrect: 72.18,
    macroSuccess: 73.33,
    macroCorrect: 68.89,
  },
  {
    model: 'gemini_2.5_pro',
    microSuccess: 74.56,
    microCorrect: 70.23,
    macroSuccess: 71.11,
    macroCorrect: 66.67,
  },
  {
    model: 'deepseek_chat_v3_0324',
    microSuccess: 68.92,
    microCorrect: 64.78,
    macroSuccess: 66.67,
    macroCorrect: 62.22,
  },
  {
    model: 'qwen3_235b_a22b',
    microSuccess: 65.43,
    microCorrect: 61.29,
    macroSuccess: 62.22,
    macroCorrect: 57.78,
  },
];

export const patternMatchingLeaderboard = [
  {
    model: 'claude_sonnet_4',
    microSuccess: 78.95,
    microCorrect: 75.32,
    macroSuccess: 76.32,
    macroCorrect: 73.68,
  },
  {
    model: 'grok_4',
    microSuccess: 76.32,
    microCorrect: 72.89,
    macroSuccess: 73.68,
    macroCorrect: 71.05,
  },
  {
    model: 'gemini_2.5_pro',
    microSuccess: 72.37,
    microCorrect: 68.95,
    macroSuccess: 70.53,
    macroCorrect: 67.11,
  },
  {
    model: 'deepseek_chat_v3_0324',
    microSuccess: 68.42,
    microCorrect: 65.13,
    macroSuccess: 66.32,
    macroCorrect: 63.16,
  },
  {
    model: 'qwen3_235b_a22b',
    microSuccess: 64.47,
    microCorrect: 61.18,
    macroSuccess: 62.11,
    macroCorrect: 59.21,
  },
];

export const subsequenceLeaderboard = [
  {
    model: 'grok_4',
    microSuccess: 85.71,
    microCorrect: 82.54,
    macroSuccess: 83.33,
    macroCorrect: 80.95,
  },
  {
    model: 'claude_sonnet_4',
    microSuccess: 80.95,
    microCorrect: 77.78,
    macroSuccess: 78.57,
    macroCorrect: 76.19,
  },
  {
    model: 'gemini_2.5_pro',
    microSuccess: 78.57,
    microCorrect: 75.40,
    macroSuccess: 76.19,
    macroCorrect: 73.81,
  },
  {
    model: 'deepseek_chat_v3_0324',
    microSuccess: 73.81,
    microCorrect: 70.63,
    macroSuccess: 71.43,
    macroCorrect: 69.05,
  },
  {
    model: 'qwen3_235b_a22b',
    microSuccess: 70.48,
    microCorrect: 67.46,
    macroSuccess: 68.57,
    macroCorrect: 66.67,
  },
];

export const palindromeRestoreLeaderboard = [
  {
    model: 'grok_4',
    microSuccess: 88.57,
    microCorrect: 85.71,
    macroSuccess: 85.71,
    macroCorrect: 82.86,
  },
  {
    model: 'claude_sonnet_4',
    microSuccess: 82.86,
    microCorrect: 80.00,
    macroSuccess: 80.00,
    macroCorrect: 77.14,
  },
  {
    model: 'gemini_2.5_pro',
    microSuccess: 80.00,
    microCorrect: 77.14,
    macroSuccess: 77.14,
    macroCorrect: 74.29,
  },
  {
    model: 'deepseek_chat_v3_0324',
    microSuccess: 75.71,
    microCorrect: 72.86,
    macroSuccess: 72.86,
    macroCorrect: 70.00,
  },
  {
    model: 'qwen3_235b_a22b',
    microSuccess: 72.86,
    microCorrect: 70.00,
    macroSuccess: 70.00,
    macroCorrect: 67.14,
  },
];

// 任务配置
export const stringTasks = [
  {
    id: 'hidden-info',
    name: '隐藏信息提取',
    description: '在长文本中提取隐藏的关键信息',
    leaderboard: hiddenInfoLeaderboard,
    task: hiddenInfoTask
  },
  {
    id: 'pattern-matching',
    name: '正则模式匹配',
    description: '使用正则表达式模式在文本中匹配特定结构',
    leaderboard: patternMatchingLeaderboard,
    task: patternMatchingTask
  },
  {
    id: 'subsequence',
    name: '最长公共子序列查找',
    description: '在多个字符串中找出最长公共子序列',
    leaderboard: subsequenceLeaderboard,
    task: subsequenceTask
  },
  {
    id: 'palindrome-search',
    name: '查找回文字串',
    description: '在长文本噪声环境下检索回文串',
    leaderboard: palindromeLeaderboard,
    task: null
  },
  {
    id: 'palindrome-restore',
    name: '最少删除字符恢复回文',
    description: '通过最少字符删除将字符串转换为回文',
    leaderboard: palindromeRestoreLeaderboard,
    task: palindromeRestoreTask
  }
]; 