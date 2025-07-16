import React from 'react';
import { Brain, Zap } from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  description: string;
  samples: number;
  category: 'basic' | 'agent';
  taskType: string;
  difficulty: string;
  metrics: string[];
}

const CategoryPage = ({
  category,
  datasets,
  setSelectedDataset,
}: {
  category: 'basic' | 'agent';
  datasets: Dataset[];
  setSelectedDataset: (id: string) => void;
}) => {
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
        {datasets.map((dataset) => (
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

export default CategoryPage; 