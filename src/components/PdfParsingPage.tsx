import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pdfParsing } from '../datasets/pdfParsing';

export default function PdfParsingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>
        返回
      </button>
      <h2 className="text-2xl font-bold mb-2">{pdfParsing.name}</h2>
      <p className="mb-4 text-gray-700">{pdfParsing.detailedDescription}</p>
      {/* 这里可以根据 pdfParsing 的结构添加更多专属内容展示 */}
    </div>
  );
} 