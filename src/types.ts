export interface ModelScore {
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

export interface Dataset {
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
  backgroundInfo?: any;
  detailedResults?: any;
  focusAnalysis?: any;
  chartData: {
    difficultyDistribution: { label: string; value: number; color: string }[];
    taskTypeDistribution: { label: string; value: number; color: string }[];
    performanceMetrics: { metric: string; average: number; top: number }[];
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  datasetId: string;
  imageUrl: string;
  content: string;
} 