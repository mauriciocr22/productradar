import { useState } from 'react';
import AnalysisResult from '../components/AnalysisResult';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import URLInput from '../components/URLInput';
import apiService from '../services/api';
import type { Analysis } from '../types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Chama a rota /api/analyze
      const result = await apiService.analyzeUrl(url);

      if (!result.success) {
        throw new Error(result.error || 'Erro ao analisar URL');
      }

      if (result.data) {
        setAnalysis(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <URLInput onSubmit={handleAnalyze} isLoading={isLoading} />
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <LoadingSpinner
                size="large"
                message="Analisando reviews da URL..."
              />
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {/* Result */}
          {analysis && !isLoading && !error && (
            <AnalysisResult analysis={analysis} />
          )}

          {/* Instructions */}
          {!analysis && !isLoading && !error && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-blue-900 font-semibold mb-3 flex items-center gap-2">
                <span>💡</span>
                Como funciona
              </h3>
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Cole a URL de um produto de e-commerce</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>A IA irá identificar e analisar os reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    Você receberá um resumo do sentimento geral e análise
                    detalhada
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
