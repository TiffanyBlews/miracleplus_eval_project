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
    microSuccess: 90.00,
    microCorrect: 90.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'deepseek_r1',
    microSuccess: 90.00,
    microCorrect: 83.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'gemini_2.5_pro',
    microSuccess: 90.00,
    microCorrect: 90.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'qwen3_235b',
    microSuccess: 90.00,
    microCorrect: 86.67,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'claude_sonnet_4',
    microSuccess: 90.00,
    microCorrect: 90.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'kimi_k2',
    microSuccess: 90.00,
    microCorrect: 83.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'qwen3_32b',
    microSuccess: 90.00,
    microCorrect: 80.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'deepseek_chat_v3',
    microSuccess: 90.00,
    microCorrect: 73.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'gemini_2.5_flash_lite',
    microSuccess: 90.00,
    microCorrect: 80.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'claude_opus_4',
    microSuccess: 13.33,
    microCorrect: 13.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
];

export const patternMatchingLeaderboard = [
  {
    model: 'grok_4',
    microSuccess: 90.00,
    microCorrect: 53.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'deepseek_r1',
    microSuccess: 83.33,
    microCorrect: 40.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'gemini_2.5_pro',
    microSuccess: 100.00,
    microCorrect: 46.67,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'qwen3_235b',
    microSuccess: 93.33,
    microCorrect: 43.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'claude_sonnet_4',
    microSuccess: 100.00,
    microCorrect: 40.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'kimi_k2',
    microSuccess: 100.00,
    microCorrect: 36.67,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'qwen3_32b',
    microSuccess: 100.00,
    microCorrect: 30.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'deepseek_chat_v3',
    microSuccess: 100.00,
    microCorrect: 33.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'gemini_2.5_flash_lite',
    microSuccess: 100.00,
    microCorrect: 26.67,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'claude_opus_4',
    microSuccess: 76.67,
    microCorrect: 40.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
];

export const subsequenceLeaderboard = [
  {
    model: 'grok_4',
    microSuccess: 50.00,
    microCorrect: 10.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'deepseek_r1',
    microSuccess: 70.00,
    microCorrect: 3.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'gemini_2.5_pro',
    microSuccess: 100.00,
    microCorrect: 3.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'qwen3_235b',
    microSuccess: 93.33,
    microCorrect: 3.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'claude_sonnet_4',
    microSuccess: 100.00,
    microCorrect: 0.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'kimi_k2',
    microSuccess: 100.00,
    microCorrect: 3.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'qwen3_32b',
    microSuccess: 86.67,
    microCorrect: 3.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'deepseek_chat_v3',
    microSuccess: 100.00,
    microCorrect: 0.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'gemini_2.5_flash_lite',
    microSuccess: 100.00,
    microCorrect: 0.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'claude_opus_4',
    microSuccess: 100.00,
    microCorrect: 3.33,
    macroSuccess: 0,
    macroCorrect: 0,
  },
];

export const palindromeRestoreLeaderboard = [
  {
    model: 'grok_4',
    microSuccess: 18.75,
    microCorrect: 37.50,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'qwen3_32b',
    microSuccess: 70.00,
    microCorrect: 17.50,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'gemini_1.5_pro',
    microSuccess: 70.00,
    microCorrect: 15.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'qwen2_235b_a22b',
    microSuccess: 63.75,
    microCorrect: 13.75,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'deepseek_chat_v3_0324',
    microSuccess: 70.00,
    microCorrect: 2.50,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'gemini_1.5_flash_lite',
    microSuccess: 71.25,
    microCorrect: 2.50,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'claude_opus_4',
    microSuccess: 68.75,
    microCorrect: 5.00,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'claude_sonnet_4',
    microSuccess: 72.50,
    microCorrect: 1.25,
    macroSuccess: 0,
    macroCorrect: 0,
  },
  {
    model: 'kimi_k2',
    microSuccess: 71.25,
    microCorrect: 1.25,
    macroSuccess: 0,
    macroCorrect: 0,
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