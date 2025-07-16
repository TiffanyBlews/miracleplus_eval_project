import { Dataset } from '../types';

export const pdfParsing: Dataset = {
  id: 'pdf-parsing',
  name: 'PDF信息解析',
  description: '复杂PDF文档的信息提取和理解能力测试，涵盖表格、图表、多栏布局等复杂结构',
  category: 'agent',
  taskType: '文档理解',
  samples: 0,
  difficulty: '困难',
  metrics: ['结构化提取', '表格理解', '图文融合'],
  detailedDescription: '即将发布的PDF信息解析数据集将包含3000+页复杂PDF文档，涵盖学术论文、财务报告、技术文档等多种类型。测试模型对复杂文档结构的理解能力，包括多栏布局、表格数据、图表信息、脚注引用等元素的准确提取和理解。',
  keyFeatures: [
    '复杂文档结构',
    '多元素融合',
    '精确信息提取',
    '语义理解能力',
    '结构化输出'
  ],
  evaluationCriteria: [
    '信息提取完整性 (35%)',
    '结构理解准确性 (30%)',
    '表格数据处理 (25%)',
    '图文关联理解 (10%)'
  ],
  sampleTask: '解析一份包含复杂表格和图表的财务报告，提取关键财务指标并理解其关联关系',
  chartData: {
    difficultyDistribution: [
      { label: '简单', value: 10, color: '#10B981' },
      { label: '中等', value: 30, color: '#F59E0B' },
      { label: '困难', value: 60, color: '#EF4444' }
    ],
    taskTypeDistribution: [
      { label: '文本提取', value: 30, color: '#3B82F6' },
      { label: '表格解析', value: 35, color: '#8B5CF6' },
      { label: '图表理解', value: 25, color: '#F59E0B' },
      { label: '结构分析', value: 10, color: '#10B981' }
    ],
    performanceMetrics: [
      { metric: '结构化提取', average: 0, top: 0 },
      { metric: '表格理解', average: 0, top: 0 },
      { metric: '图文融合', average: 0, top: 0 }
    ]
  }
}; 