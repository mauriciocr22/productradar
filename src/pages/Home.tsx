import { useState } from 'react';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import URLInput from '../components/URLInput';
import apiService from '../services/api';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const testResult = await apiService.testSentiment(
        `Analise esta URL de produto: ${url}`
      );

      setResult(testResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 m-8">
            <URLInput onSubmit={handleAnalyze} isLoading={isLoading} />
          </div>

          {isLoading && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <LoadingSpinner message="Analisando reviews..." />
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-red-800 font-semibold mb-2">Erro</h3>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {result && !isLoading && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Resultado da Análise
              </h2>

              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Texto analisado:</span>
                  <p className="text-gray-600 mt-1 break-words">
                    {result.data?.input}
                  </p>
                </div>

                <div>
                  <span className="font-semibold">Sentimento:</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                      result.data?.sentiment === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : result.data?.sentiment === 'negative'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {result.data?.sentiment}
                  </span>
                </div>
                {result.data?.usage && (
                  <div className="text-sm text-gray-500">
                    <p>Tokens usados: {result.data.usage.totalTokens}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!result && !isLoading && !error && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-blue-900 font-semibold mb-2">
                Como funciona
              </h3>
              <ul className="text-blue-800 space-y-2">
                <li>• Cole a URL de um produto de e-commerce</li>
                <li>• A IA irá identificar e analisar os reviews</li>
                <li>• Você receberá um resumo do sentimento geral</li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
