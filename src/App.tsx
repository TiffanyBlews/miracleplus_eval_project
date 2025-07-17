import React, { useState } from 'react';
import { Menu, X, ChevronRight, BarChart3, Database, FileText, TrendingUp, Users, Award, Search, Filter, Eye, Brain, Zap, ArrowLeft, PieChart, Activity, Target, Clock, CheckCircle } from 'lucide-react';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import DatasetDetailPage from './components/DatasetDetailPage';
import FinancialPosterPage from './components/FinancialPosterPage';
import PalindromeSearchPage from './components/PalindromeSearchPage';
import PdfParsingPage from './components/PdfParsingPage';
import { financialPoster, financialPosterCaseStudies } from './datasets/financialPoster';
import { palindromeSearch } from './datasets/palindromeSearch';
import { pdfParsing } from './datasets/pdfParsing';

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

const datasets = [financialPoster, palindromeSearch, pdfParsing];
const caseStudies = [
  ...financialPosterCaseStudies
  // 其它数据集如有案例可继续添加
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
        {selectedDataset ? (
          selectedDataset === 'financial-poster' ? (
            <FinancialPosterPage setSelectedDataset={setSelectedDataset} />
          ) : selectedDataset === 'palindrome-search' ? (
            <PalindromeSearchPage setSelectedDataset={setSelectedDataset} />
          ) : selectedDataset === 'pdf-parsing' ? (
            <PdfParsingPage setSelectedDataset={setSelectedDataset} />
          ) : null
        ) : activeTab === 'home' ? (
          <HomePage
            setActiveTab={setActiveTab}
            basicDatasets={basicDatasets}
            agentDatasets={agentDatasets}
            setSelectedDataset={setSelectedDataset}
          />
        ) : activeTab === 'basic' ? (
          <CategoryPage
            category="basic"
            datasets={basicDatasets}
            setSelectedDataset={setSelectedDataset}
          />
        ) : activeTab === 'agent' ? (
          <CategoryPage
            category="agent"
            datasets={agentDatasets}
            setSelectedDataset={setSelectedDataset}
          />
        ) : null}
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