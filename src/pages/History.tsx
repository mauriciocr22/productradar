import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import apiService from '../services/api';
import type { Analysis } from '../types';

export default function History() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiService.getHistory();

      if (!result.success) {
        throw new Error(result.error || 'Erro ao carregar histórico');
      }

      if (result.data) {
        setAnalyses(result.data.analyses);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    const sentimentLower = sentiment.toLowerCase();
    if (sentimentLower.includes('positiv')) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (sentimentLower.includes('negativ')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getSentimentEmoji = (sentiment: string) => {
    const sentimentLower = sentiment.toLowerCase();
    if (sentimentLower.includes('positiv')) {
      return '😊';
    } else if (sentimentLower.includes('negativ')) {
      return '😞';
    }
    return '😐';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Histórico de Análises" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header da página */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Histórico de Análises
              </h1>
              <p className="text-gray-600 mt-2">
                {analyses.length > 0
                  ? `${analyses.length} análise${analyses.length > 1 ? 's' : ''} encontrada${analyses.length > 1 ? 's' : ''}`
                  : 'Nenhuma análise ainda'}
              </p>
            </div>
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Nova Análise
            </Link>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <LoadingSpinner message="Carregando histórico..." />
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <ErrorMessage message={error} onRetry={loadHistory} />
          )}

          {/* Empty State */}
          {!isLoading && !error && analyses.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12">
              <EmptyState
                icon="📊"
                message="Nenhuma análise realizada ainda. Comece analisando sua primeira URL!"
              />
              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Fazer Primeira Análise
                </Link>
              </div>
            </div>
          )}

          {/* Lista de análises */}
          {!isLoading && !error && analyses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyses.map((analysis) => (
                <Link
                  key={analysis.id}
                  to={`/analysis/${analysis.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-6 space-y-4">
                    {/* Sentiment Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getSentimentColor(
                          analysis.analiseIA.sentimentoGeral
                        )}`}
                      >
                        <span>
                          {getSentimentEmoji(analysis.analiseIA.sentimentoGeral)}
                        </span>
                        <span>{analysis.analiseIA.sentimentoGeral}</span>
                      </span>
                      <span className="text-xs font-semibold text-yellow-600">
                        {analysis.metricas.mediaEstrelas.toFixed(1)} ⭐
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3rem]">
                      {analysis.produto.nome}
                    </h3>

                    {/* Price and Seller */}
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-blue-600">
                        R$ {analysis.produto.preco.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {analysis.produto.vendedor}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-xl font-bold text-blue-600">
                          {analysis.metricas.totalAvaliacoes}
                        </p>
                        <p className="text-xs text-gray-600">Avaliações</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-purple-600">
                          {analysis.metricas.reviewsAnalisados}
                        </p>
                        <p className="text-xs text-gray-600">Analisados</p>
                      </div>
                    </div>

                    {/* Confidence Score */}
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Confiabilidade:</span>
                        <span
                          className={`font-semibold ${
                            analysis.analiseIA.scoreConfiabilidade >= 80
                              ? 'text-green-600'
                              : analysis.analiseIA.scoreConfiabilidade >= 50
                                ? 'text-yellow-600'
                                : 'text-red-600'
                          }`}
                        >
                          {analysis.analiseIA.scoreConfiabilidade}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className={`h-full rounded-full ${
                            analysis.analiseIA.scoreConfiabilidade >= 80
                              ? 'bg-green-500'
                              : analysis.analiseIA.scoreConfiabilidade >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                          }`}
                          style={{
                            width: `${analysis.analiseIA.scoreConfiabilidade}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-xs text-gray-400 pt-2 border-t">
                      {new Date(analysis.createdAt).toLocaleDateString(
                        'pt-BR',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 px-6 py-3 text-sm text-blue-600 font-medium group-hover:bg-blue-50 transition-colors">
                    Ver detalhes →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
