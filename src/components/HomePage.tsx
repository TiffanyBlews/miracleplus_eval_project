import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Zap } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
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
            onClick={() => navigate('/basic')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            基础能力评测
          </button>
          <button 
            onClick={() => navigate('/agent')}
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
          <ul className="list-disc ml-6 text-gray-700">
            <li>长文本推理与检索</li>
            <li>多模态理解与推理</li>
            <li>复杂信息抽取与分析</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <Zap className="text-purple-600 mr-3" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Agent能力评测</h2>
          </div>
          <p className="text-gray-600 mb-6">
            测试模型在复杂任务执行、工具使用等Agent场景下的综合能力
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>文档解析与结构化提取</li>
            <li>工具链调用与任务执行</li>
            <li>多环节推理与自我认知</li>
          </ul>
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
} 