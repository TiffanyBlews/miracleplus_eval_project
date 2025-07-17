import { Dataset, CaseStudy } from '../types';

export const financialPoster: Dataset = {
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
    ]
  }
};

export const financialPosterCaseStudies: CaseStudy[] = [
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