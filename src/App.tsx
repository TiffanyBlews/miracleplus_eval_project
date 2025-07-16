import React, { useState } from 'react';
import { Menu, X, ChevronRight, BarChart3, Database, FileText, TrendingUp, Users, Award, Search, Filter, Eye, Brain, Zap, ArrowLeft, PieChart, Activity, Target, Clock, CheckCircle } from 'lucide-react';

interface ModelScore {
  model: string;
  company: string;
  score: number;
  lastUpdate: string;
  details?: {
    accuracy?: number;
    speed?: number;
    robustness?: number;
  };
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'agent';
  taskType: string;
  samples: number;
  difficulty: string;
  metrics: string[];
  detailedDescription: string;
  keyFeatures: string[];
  evaluationCriteria: string[];
  sampleTask: string;
  backgroundInfo?: {
    inspiration: string;
    challenges: string[];
    coverage: string[];
    overview: {
      totalSamples: number;
      totalImages: number;
      questionTypes: { type: string; count: number }[];
      abilityDimensions: { dimension: string; count: number }[];
    };
  };
  detailedResults?: {
    rankings: { model: string; provider: string; score: number }[];
    taskPerformance: { 
      model: string; 
      provider: string; 
      choice: number; 
      openEnded: number; 
      fillBlank: number; 
    }[];
    keyFindings: string[];
  };
  focusAnalysis?: {
    title: string;
    description: string;
    cases: {
      title: string;
      taskId: string;
      description: string;
      correctAnswer: string;
      grokAnswer: string;
      analysis: string;
    }[];
  };
  chartData: {
    difficultyDistribution: { label: string; value: number; color: string }[];
    taskTypeDistribution: { label: string; value: number; color: string }[];
    performanceMetrics: { metric: string; average: number; top: number }[];
  };
}

interface CaseStudy {
  id: string;
  title: string;
  datasetId: string;
  imageUrl: string; // 图片位置
  content: string; // 合并后的文本内容
}

const caseStudies: CaseStudy[] = [
  {
    id: 'case-financial-1',
    title: '军工行业细分领域龙头企业分析',
    datasetId: 'financial-poster',
    imageUrl: '/军工行业细分领域龙头企业.JPG',
    content: `任务 (task_id: 116): 找出表格中所有地位描述包含“唯一”一词的公司。\n\n正确答案: 中航沈飞、中直股份、中国卫星、西部超导。\n\nGrok-4 的回答: 基于图片中的表格，我仔细阅读了“地位”一列的所有描述（总共14家公司），并筛选出描述中明确包含“唯一”这个词的公司。以下是这些公司的全称（以图片中的表述为准，这些通常是其股票市场或行业标准全称），我按表格从上到下的顺序列出，并附带其地位描述作为参考（以确认包含“唯一”）：\n中航沈飞 ：歼击机领域唯一上市平台\n中航西飞 ：轰炸机/大型运输机/特种机领域唯一上市平台\n中直股份 ：直升机领域唯一上市平台\n航发动力 ：航空发动机整机领域唯一上市平台\n洪都航空 ：教练机/导弹领域唯一上市平台\n\n点评：模型的回答质量差。虽然格式清晰、解释逻辑看似合理，但核心内容严重错误。它仅找出一半的正确答案，却增加了三个不符合已知事实的公司，表明其未能准确理解或处理问题所依据的数据，存在严重的幻觉或数据错配问题，导致结果不可信。`
  },
  {
    id: 'case-financial-2',
    title: '美股IPO表现分析',
    datasetId: 'financial-poster',
    imageUrl: '/美股IPO表现.jpg',
    content: `任务 (task_id: 28): 按指定格式，提取海报中涨幅前三的股票和指数信息，并计算大盘指数变动情况。\n\n正确答案: \n市场表现速览（2025.01.02 - 2025.04.17）\n涨幅TOP3股票\nDiginex (DGNX.O): 涨幅：+2707%\n联掌门户 (LZMH.O): 涨幅：+128%\nKarman Holdings (KRMN.N): 涨幅：+58%\n同期大盘指数表现\n指数名称： 纳斯达克指数\n期间变动： -12.96% (由 20975.62点 下跌至 18258.09点)\n\nGrok-4 的回答: \n【分析主题】市场表现速览（4月以来）\n\n涨幅TOP3股票\n1. SMAN (SMAN):涨幅：+16%\n2. DOKO (DOKO):涨幅：+13.0%\n3. SFD (SFD):涨幅：+1.4%\n\n---\n同期大盘指数表现\n指数名称： OVR指数\n期间变动：+270.73%\n（由 497.62点 变化至 1825.80点）\n\n点评：模型完全未能完成问题要求的信息提取任务。它完全遵循了输出格式，但填充的所有数据——无论是股票名称、涨幅、指数名称还是点位变动——全部是凭空捏造的，与图片信息毫无关联。该回复不仅毫无价值，甚至可能产生严重误导。`
  }
];
const datasets: Dataset[] = [
  {
    id: 'financial-poster',
    name: '金融海报复杂多模态推理',
    description: '基于真实金融海报的复杂多模态推理能力测试，检验模型在金融专业场景下的综合理解能力',
    category: 'basic',
    taskType: '多模态推理',
    samples: 134,
    difficulty: '困难',
    metrics: ['准确率', '推理深度', '多模态融合能力'],
    detailedDescription: '该数据集基于真实世界金融分析师制作的信息海报，这些海报将复杂的行业或企业数据以直观、高效的方式呈现。数据集旨在检验模型是否具备远超简单看图说话的能力，能否在复杂的金融专业场景下进行准确的多模态推理。',
    backgroundInfo: {
      inspiration: '在金融领域，数据分析师们经常将复杂的行业或企业数据制作成信息丰富、样式多样的海报，以求直观、高效地传递核心观点。这些海报，正是我们数据集的灵感来源。它们为评测多模态大模型提供了一个天然的、高水准的基准，因为理解它们需要模型具备远超简单看图说话的能力。',
      challenges: [
        '视觉与OCR的精准度：海报中文字样式丰富、位置交错，甚至有艺术化字体。模型能否在复杂背景下准确识别所有文字和数字，而不产生幻觉？',
        '图表交叉理解：海报常将多个图表（如折线图、柱状图）混合排列。模型能否正确区分并提取信息，而不是将A图表的数据误读为B图表的内容？',
        '精准的计算能力：海报中的数据分析需要模型进行加、减、乘、除等计算。模型能否正确理解计算逻辑并得出准确结果？',
        '金融领域世界知识：理解"市盈率"、"产业链地位"、"涨停复盘"等专业概念是正确推理的基础。模型是真正理解这些金融共识，还是仅仅基于表面文本进行猜测？'
      ],
      coverage: [
        '国家层面：宏观经济数据、重要财经日历、国家政策解读等',
        '产业层面：核心产业链梳理、多股股市表现对比、行业整体业绩、市场热点（如涨停复盘）等',
        '企业层面：公司发展历史、股权结构图、核心财务状况、供应链关系、个股表现等',
        '投资者层面：面向投资者的策略分析、市场情绪等'
      ],
      overview: {
        totalSamples: 134,
        totalImages: 58,
        questionTypes: [
          { type: '选择题', count: 78 },
          { type: '开放性问题', count: 51 },
          { type: '填空题', count: 5 }
        ],
        abilityDimensions: [
          { dimension: '信息提取', count: 79 },
          { dimension: '综合理解', count: 23 },
          { dimension: '数据分析', count: 19 },
          { dimension: '推理计算', count: 13 }
        ]
      }
    },
    detailedResults: {
      rankings: [
        { model: 'Gemini 2.5 Pro', provider: 'Google', score: 4.597 },
        { model: 'O4-mini-high', provider: 'OpenAI', score: 4.201 },
        { model: 'GLM-4.1v-thinking', provider: 'Zhipu AI', score: 4.000 },
        { model: 'Claude Sonnet 4', provider: 'Anthropic', score: 3.617 },
        { model: 'Qwen 2.5 VL', provider: 'Qwen', score: 3.519 },
        { model: 'Grok-4', provider: 'xAI', score: 2.519 }
      ],
      taskPerformance: [
        { model: 'Gemini 2.5 Pro', provider: 'Google', choice: 4.94, openEnded: 4.24, fillBlank: 3.00 },
        { model: 'O4-mini-high', provider: 'OpenAI', choice: 4.68, openEnded: 3.59, fillBlank: 3.00 },
        { model: 'GLM-4.1v-thinking', provider: 'Zhipu AI', choice: 4.55, openEnded: 3.43, fillBlank: 1.20 },
        { model: 'Qwen 2.5 VL', provider: 'Qwen', choice: 3.97, openEnded: 3.09, fillBlank: 0.80 },
        { model: 'Claude Sonnet 4', provider: 'Anthropic', choice: 3.95, openEnded: 3.28, fillBlank: 1.80 },
        { model: 'Grok-4', provider: 'xAI', choice: 3.21, openEnded: 1.62, fillBlank: 0.80 }
      ],
      keyFindings: [
        '全能冠军：Gemini 2.5 Pro 在所有题型中均表现出色，尤其在选择题上近乎满分，展现了其卓越的图文理解和推理能力',
        '实力梯队：O4-mini 和 GLM-4.1v-thinking 紧随其后，在特定任务上表现稳健，证明了其强大的综合实力',
        '开源之光：GLM-4.1v 和 Qwen 2.5 VL 作为开源模型的代表，性能优于某些知名闭源模型，展示了其在多模态理解领域的巨大潜力'
      ]
    },
    focusAnalysis: {
      title: 'Grok-4 的"滑铁卢"',
      description: '正如用户反馈，Grok-4 虽在一些理论性或高难度榜单上表现亮眼，但在我们这个更贴近日常应用场景的数据集上，却暴露了严重的问题——事实性错误和内容幻觉。',
      cases: [
        {
          title: '信息提取问题中的"无中生有"',
          taskId: '116',
          description: '找出表格中所有地位描述包含"唯一"一词的公司。',
          correctAnswer: '中航沈飞、中直股份、中国卫星、西部超导。',
          grokAnswer: '中航沈飞、中航西飞、中直股份、航发动力、洪都航空（其中中航西飞、航发动力、洪都航空为错误答案）',
          analysis: '模型的回答质量差。虽然格式清晰、解释逻辑看似合理，但核心内容严重错误。它仅找出一半的正确答案，却增加了三个不符合已知事实的公司，表明其未能准确理解或处理问题所依据的数据，存在严重的幻觉或数据错配问题，导致结果不可信。'
        },
        {
          title: '填空题中的"凭空想象"',
          taskId: '28',
          description: '按指定格式，提取海报中涨幅前三的股票和指数信息，并计算大盘指数变动情况。',
          correctAnswer: 'Diginex (DGNX.O): +2707%, 联掌门户 (LZMH.O): +128%, Karman Holdings (KRMN.N): +58%',
          grokAnswer: 'SMAN (SMAN): +16%, DOKO (DOKO): +13.0%, SFD (SFD): +1.4%（完全捏造的数据）',
          analysis: '模型完全未能完成问题要求的信息提取任务。它完全遵循了输出格式，但填充的所有数据——无论是股票名称、涨幅、指数名称还是点位变动——全部是凭空捏造的，与图片信息毫无关联。该回复不仅毫无价值，甚至可能产生严重误导。'
        }
      ]
    },
    keyFeatures: [
      '真实世界金融海报数据',
      '复杂视觉与OCR挑战',
      '图表交叉理解能力',
      '精准计算推理',
      '金融专业知识理解'
    ],
    evaluationCriteria: [
      '视觉识别与OCR准确性 (25%)',
      '图表理解与信息提取 (30%)',
      '数值计算与逻辑推理 (25%)',
      '金融专业知识应用 (20%)'
    ],
    sampleTask: '分析包含多个图表和数据的金融海报，准确提取关键信息、进行数值计算，并基于金融专业知识进行推理分析',
    chartData: {
      difficultyDistribution: [
        { label: '信息提取', value: 59, color: '#3B82F6' },
        { label: '综合理解', value: 17, color: '#8B5CF6' },
        { label: '数据分析', value: 14, color: '#F59E0B' },
        { label: '推理计算', value: 10, color: '#10B981' }
      ],
      taskTypeDistribution: [
        { label: '选择题', value: 58, color: '#3B82F6' },
        { label: '开放性问题', value: 38, color: '#8B5CF6' },
        { label: '填空题', value: 4, color: '#F59E0B' }
      ],
      performanceMetrics: [
        { metric: '综合得分', average: 3.74, top: 4.60 },
        { metric: '选择题表现', average: 4.22, top: 4.94 },
        { metric: '开放性问题', average: 3.21, top: 4.24 }
      ]
    }
  },
  {
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
      performanceMetrics: [
        { metric: '检索准确率', average: 78.2, top: 92.1 },
        { metric: '抗噪能力', average: 71.5, top: 86.3 },
        { metric: '长文本理解', average: 74.8, top: 89.7 }
      ]
    }
  },
  {
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
  }
];

const mockLeaderboards: { [key: string]: ModelScore[] } = {
  'financial-poster': [
    { model: 'Gemini 2.5 Pro', company: 'Google', score: 91.9, lastUpdate: '2024-01-15', details: { accuracy: 94.0, speed: 89.8, robustness: 91.9 } },
    { model: 'O4-mini-high', company: 'OpenAI', score: 84.0, lastUpdate: '2024-01-14', details: { accuracy: 86.8, speed: 81.2, robustness: 84.0 } },
    { model: 'GLM-4.1v-thinking', company: 'Zhipu AI', score: 80.0, lastUpdate: '2024-01-13', details: { accuracy: 82.5, speed: 77.5, robustness: 80.0 } },
    { model: 'Claude Sonnet 4', company: 'Anthropic', score: 72.3, lastUpdate: '2024-01-12', details: { accuracy: 75.0, speed: 69.6, robustness: 72.3 } },
    { model: 'Qwen 2.5 VL', company: 'Qwen', score: 70.4, lastUpdate: '2024-01-11', details: { accuracy: 73.7, speed: 67.1, robustness: 70.4 } },
    { model: 'Grok-4', company: 'xAI', score: 50.4, lastUpdate: '2024-01-10', details: { accuracy: 52.1, speed: 48.7, robustness: 50.4 } },
  ],
  'palindrome-search': [
    { model: 'GPT-4V', company: 'OpenAI', score: 92.1, lastUpdate: '2024-01-15', details: { accuracy: 93.2, speed: 91.0, robustness: 92.1 } },
    { model: 'Claude-3.5 Sonnet', company: 'Anthropic', score: 89.7, lastUpdate: '2024-01-14', details: { accuracy: 90.5, speed: 88.9, robustness: 89.7 } },
    { model: 'Gemini Pro', company: 'Google', score: 87.3, lastUpdate: '2024-01-13', details: { accuracy: 88.1, speed: 86.5, robustness: 87.3 } },
    { model: 'GLM-4V', company: '智谱AI', score: 85.2, lastUpdate: '2024-01-12', details: { accuracy: 86.0, speed: 84.4, robustness: 85.2 } },
    { model: 'Qwen-VL-Plus', company: '阿里云', score: 83.8, lastUpdate: '2024-01-11', details: { accuracy: 84.5, speed: 83.1, robustness: 83.8 } },
  ],
  'pdf-parsing': []
};

interface CaseStudy {
  id: string;
  title: string;
  datasetId: string;
  imageUrl: string; // 图片位置
  content: string; // 合并后的文本内容
}


function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const basicDatasets = datasets.filter(d => d.category === 'basic');
  const agentDatasets = datasets.filter(d => d.category === 'agent');

  const NavItem = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSelectedDataset(null);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        activeTab === id
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const PieChart = ({ data, title }: { data: { label: string; value: number; color: string }[]; title: string }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = -cumulativePercentage;
                cumulativePercentage += percentage;

                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MetricBar = ({ metric, average, top }: { metric: string; average: number; top: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{metric}</span>
        <span className="text-sm text-gray-600">最高: {top}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-600 h-3 rounded-full relative" style={{ width: `${average}%` }}>
          <div 
            className="absolute top-0 right-0 w-1 h-3 bg-green-500 rounded-r-full"
            style={{ right: `${100 - top}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>平均: {average}%</span>
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          AI模型评测基准平台
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          奇绩创坛行研部门专业AI模型评测平台，提供全面的基础能力与Agent能力测试
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setActiveTab('basic')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            基础能力评测
          </button>
          <button 
            onClick={() => setActiveTab('agent')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Agent能力评测
          </button>
        </div>
      </div>

      {/* Capability Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <Brain className="text-blue-600 mr-3" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">基础能力评测</h2>
          </div>
          <p className="text-gray-600 mb-6">
            评估模型在长文本处理、多模态推理等基础认知能力方面的表现
          </p>
          <div className="space-y-4">
            {basicDatasets.map((dataset) => (
              <div key={dataset.id} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{dataset.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">{dataset.samples} 样本</span>
                  <button 
                    onClick={() => setSelectedDataset(dataset.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    查看详情 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <Zap className="text-purple-600 mr-3" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Agent能力评测</h2>
          </div>
          <p className="text-gray-600 mb-6">
            测试模型在复杂任务执行、工具使用等Agent场景下的综合能力
          </p>
          <div className="space-y-4">
            {agentDatasets.map((dataset) => (
              <div key={dataset.id} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{dataset.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600 font-medium">
                    {dataset.samples > 0 ? `${dataset.samples} 样本` : '即将发布'}
                  </span>
                  <button 
                    onClick={() => setSelectedDataset(dataset.id)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    查看详情 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">5+</div>
            <div className="text-blue-100">活跃模型</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">3</div>
            <div className="text-blue-100">核心数据集</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">4.3K</div>
            <div className="text-blue-100">测试样本</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">92.1%</div>
            <div className="text-blue-100">最高得分</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategoryPage = (category: 'basic' | 'agent') => {
    const categoryDatasets = datasets.filter(d => d.category === category);
    const categoryTitle = category === 'basic' ? '基础能力评测' : 'Agent能力评测';
    const categoryIcon = category === 'basic' ? Brain : Zap;
    const categoryColor = category === 'basic' ? 'blue' : 'purple';

    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          {React.createElement(categoryIcon, { 
            className: `text-${categoryColor}-600`, 
            size: 32 
          })}
          <h1 className="text-3xl font-bold text-gray-900">{categoryTitle}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryDatasets.map((dataset) => (
            <div 
              key={dataset.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedDataset(dataset.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{dataset.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  dataset.difficulty === '困难' ? 'bg-red-100 text-red-800' :
                  dataset.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {dataset.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{dataset.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">任务类型:</span>
                  <span className="ml-2 text-gray-600">{dataset.taskType}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">样本数:</span>
                  <span className="ml-2 text-gray-600">{dataset.samples || '即将发布'}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {dataset.metrics.map((metric, index) => (
                    <span key={index} className={`px-2 py-1 bg-${categoryColor}-50 text-${categoryColor}-700 rounded-md text-sm`}>
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDatasetDetail = (datasetId: string) => {
    const dataset = datasets.find(d => d.id === datasetId);
    const leaderboard = mockLeaderboards[datasetId] || [];
    const datasetCaseStudies = caseStudies.filter(cs => cs.datasetId === datasetId);

    if (!dataset) return null;

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setSelectedDataset(null);
              setActiveTab(dataset.category);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{dataset.name}</h1>
            <p className="text-gray-600 mt-2">{dataset.description}</p>
          </div>
        </div>

        {/* Dataset Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">数据集概览</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">详细描述</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{dataset.detailedDescription}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">核心特性</h3>
              <ul className="space-y-2">
                {dataset.keyFeatures.map((feature, index) => (
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
                {dataset.evaluationCriteria.map((criteria, index) => (
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

        {/* Data Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PieChart 
            data={dataset.chartData.difficultyDistribution} 
            title="难度分布" 
          />
          <PieChart 
            data={dataset.chartData.taskTypeDistribution} 
            title="任务类型分布" 
          />
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">性能指标</h3>
            <div className="space-y-4">
              {dataset.chartData.performanceMetrics.map((metric, index) => (
                <MetricBar 
                  key={index}
                  metric={metric.metric}
                  average={metric.average * 20}  // 转换为百分比
                  top={metric.top * 20}          // 转换为百分比
                />
              ))}
            </div>
          </div>
        </div>

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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboard.map((model, index) => (
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
                        <div className="text-gray-600">{model.company}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                          {model.score}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

    {/* Case Studies - 这部分需要被替换 */}
    {datasetCaseStudies.length > 0 && (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">案例分析</h2>
        <div className="space-y-12">
          {datasetCaseStudies.map((study) => (
            <div key={study.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="w-full">
                <img src={study.imageUrl} alt={study.title} className="rounded-lg shadow-lg object-contain w-full" />
              </div>
              <div className="prose prose-lg max-w-none">
                <h4 className="text-xl font-bold mb-4">{study.title}</h4>
                <p className="text-gray-600" style={{ whiteSpace: 'pre-wrap' }}>{study.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
        
        {/* Conclusion for Financial Poster */}
        {dataset.id === 'financial-poster' && (
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
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">AI Benchmark</h1>
                <p className="text-sm text-gray-600">奇绩创坛 · 行研部门</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-2">
              <NavItem id="home" label="首页" icon={BarChart3} />
              <NavItem id="basic" label="基础能力" icon={Brain} />
              <NavItem id="agent" label="Agent能力" icon={Zap} />
            </nav>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <NavItem id="home" label="首页" icon={BarChart3} />
            <NavItem id="basic" label="基础能力" icon={Brain} />
            <NavItem id="agent" label="Agent能力" icon={Zap} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedDataset ? renderDatasetDetail(selectedDataset) :
         activeTab === 'home' ? renderHome() :
         activeTab === 'basic' ? renderCategoryPage('basic') :
         activeTab === 'agent' ? renderCategoryPage('agent') : null}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">关于我们</h3>
              <p className="text-sm text-gray-600">
                奇绩创坛行研部门专注于AI模型评测与研究，为行业提供专业的技术洞察。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">基础能力</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>长文本处理</li>
                <li>多模态推理</li>
                <li>复杂推理能力</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Agent能力</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>文档解析</li>
                <li>工具使用</li>
                <li>任务执行</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">联系我们</h3>
              <p className="text-sm text-gray-600">
                research@miracleplus.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2024 奇绩创坛. 保留所有权利。
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;