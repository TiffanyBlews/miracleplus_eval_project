import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import PalindromeSearchPage from './components/PalindromeSearchPage';
import FinancialPosterPage from './components/FinancialPosterPage';
import PdfParsingPage from './components/PdfParsingPage';
import { BarChart3, Brain, Zap, Menu, X } from 'lucide-react';

// 主要的应用组件，包含导航和路由
function AppContent() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => {
        navigate(path);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        window.location.pathname === path
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
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
              <NavItem path="/" label="首页" icon={BarChart3} />
              <NavItem path="/basic" label="基础能力" icon={Brain} />
              <NavItem path="/agent" label="Agent能力" icon={Zap} />
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
            <NavItem path="/" label="首页" icon={BarChart3} />
            <NavItem path="/basic" label="基础能力" icon={Brain} />
            <NavItem path="/agent" label="Agent能力" icon={Zap} />
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic" element={<CategoryPage category="basic" />} />
          <Route path="/agent" element={<CategoryPage category="agent" />} />
          <Route path="/dataset/palindrome-search" element={<PalindromeSearchPage />} />
          <Route path="/dataset/financial-poster" element={<FinancialPosterPage />} />
          <Route path="/dataset/pdf-parsing" element={<PdfParsingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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

function App() {
  return <AppContent />;
}

export default App;