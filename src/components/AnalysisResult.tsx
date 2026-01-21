import type { AnalysisResultProps } from '../types';

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
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

  const getRecommendationColor = (recommendation: string) => {
    const recLower = recommendation.toLowerCase();
    if (recLower.startsWith('comprar') || recLower.includes('recomend')) {
      return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300';
    } else if (recLower.startsWith('não comprar') || recLower.includes('evitar')) {
      return 'bg-gradient-to-br from-red-50 to-rose-50 border-red-300';
    }
    return 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300';
  };

  const getRecommendationTextColor = (recommendation: string) => {
    const recLower = recommendation.toLowerCase();
    if (recLower.startsWith('comprar') || recLower.includes('recomend')) {
      return 'text-green-900';
    } else if (recLower.startsWith('não comprar') || recLower.includes('evitar')) {
      return 'text-red-900';
    }
    return 'text-yellow-900';
  };

  const getRecommendationIcon = (recommendation: string) => {
    const recLower = recommendation.toLowerCase();
    if (recLower.startsWith('comprar') || recLower.includes('recomend')) {
      return '✅';
    } else if (recLower.startsWith('não comprar') || recLower.includes('evitar')) {
      return '❌';
    }
    return '⚠️';
  };

  const getRecommendationLabel = (recommendation: string) => {
    const recLower = recommendation.toLowerCase();
    if (recLower.startsWith('comprar') || recLower.includes('recomend')) {
      return 'RECOMENDADO';
    } else if (recLower.startsWith('não comprar') || recLower.includes('evitar')) {
      return 'NÃO RECOMENDADO';
    }
    return 'AVALIAR COM CAUTELA';
  };

  // Os valores já vêm como porcentagem do backend
  const getStarPercentage = (percentage: number) => {
    return percentage;
  };

  // Calcula a quantidade absoluta de avaliações baseada na porcentagem
  const getStarCount = (percentage: number) => {
    return Math.round((percentage / 100) * analysis.metricas.totalAvaliacoes);
  };

  return (
    <div className="space-y-6">
      {/* Recomendação - DESTAQUE PRINCIPAL */}
      <div className={`rounded-2xl shadow-2xl border-3 p-8 md:p-12 ${getRecommendationColor(analysis.analiseIA.recomendacao)}`}>
        {/* Badge de Recomendação */}
        <div className="flex items-center justify-center mb-6">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg ${getRecommendationTextColor(analysis.analiseIA.recomendacao)} bg-white/80 shadow-lg`}>
            <span className="text-3xl">
              {getRecommendationIcon(analysis.analiseIA.recomendacao)}
            </span>
            <span>{getRecommendationLabel(analysis.analiseIA.recomendacao)}</span>
          </div>
        </div>

        {/* Texto da Recomendação */}
        <div className="text-center mb-8">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${getRecommendationTextColor(analysis.analiseIA.recomendacao)}`}>
            Nossa Recomendação
          </h2>
          <p className={`text-xl md:text-2xl leading-relaxed font-medium ${getRecommendationTextColor(analysis.analiseIA.recomendacao)}`}>
            {analysis.analiseIA.recomendacao}
          </p>
        </div>

        {/* Score de Confiabilidade Integrado */}
        <div className="bg-white/60 backdrop-blur rounded-xl p-6 border border-white/50">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke={
                    analysis.analiseIA.scoreConfiabilidade >= 80
                      ? '#10b981'
                      : analysis.analiseIA.scoreConfiabilidade >= 50
                        ? '#f59e0b'
                        : '#ef4444'
                  }
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(analysis.analiseIA.scoreConfiabilidade / 100) * 314} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">
                  {analysis.analiseIA.scoreConfiabilidade}
                </span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg font-bold text-gray-900 mb-2">
                Score de Confiabilidade
              </p>
              <p className="text-gray-700">
                Esta análise possui{' '}
                <span className="font-bold">
                  {analysis.analiseIA.scoreConfiabilidade >= 80
                    ? 'alta confiabilidade'
                    : analysis.analiseIA.scoreConfiabilidade >= 50
                      ? 'confiabilidade moderada'
                      : 'baixa confiabilidade'}
                </span>
                , baseado na quantidade e qualidade das {analysis.metricas.reviewsAnalisados} avaliações analisadas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header - Produto e Sentimento */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">
                {getSentimentEmoji(analysis.analiseIA.sentimentoGeral)}
              </span>
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getSentimentColor(
                  analysis.analiseIA.sentimentoGeral
                )}`}
              >
                {analysis.analiseIA.sentimentoGeral}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {analysis.produto.nome}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {analysis.produto.descricaoResumida}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">
                R$ {analysis.produto.preco.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Vendido por {analysis.produto.vendedor}
              </p>
            </div>
          </div>
        </div>

        {/* URL Analisada */}
        <div className="mt-6 pt-6 border-t">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
            URL Analisada
          </label>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-sm text-gray-600 break-all">{analysis.url}</p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Análise realizada em{' '}
            {new Date(analysis.createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-yellow-500 mb-2">
            {analysis.metricas.mediaEstrelas.toFixed(1)} ⭐
          </div>
          <p className="text-sm text-gray-600 font-medium">Média de Estrelas</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {analysis.metricas.totalAvaliacoes}
          </div>
          <p className="text-sm text-gray-600 font-medium">
            Total de Avaliações
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {analysis.metricas.reviewsAnalisados}
          </div>
          <p className="text-sm text-gray-600 font-medium">Reviews Analisados</p>
        </div>
      </div>

      {/* Distribuição de Estrelas */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Distribuição de Avaliações
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => {
            const percentage =
              analysis.metricas.distribuicaoEstrelas[
                star.toString() as keyof typeof analysis.metricas.distribuicaoEstrelas
              ] || 0;
            const count = getStarCount(percentage);
            return (
              <div key={star} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-20">
                  <span className="text-sm font-medium text-gray-700">
                    {star}
                  </span>
                  <span className="text-yellow-500">⭐</span>
                </div>
                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-20 text-right">
                  <span className="text-sm font-semibold text-gray-700">
                    {count}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({percentage.toFixed(0)}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pontos Fortes e Fracos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pontos Fortes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">👍</span>
            <h3 className="text-lg font-bold text-gray-800">Pontos Fortes</h3>
          </div>
          {analysis.analiseIA.pontosFortesRecorrentes.length > 0 ? (
            <ul className="space-y-2">
              {analysis.analiseIA.pontosFortesRecorrentes.map((ponto, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="flex-1">{ponto}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Nenhum ponto forte identificado</p>
          )}
        </div>

        {/* Pontos Fracos */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">👎</span>
            <h3 className="text-lg font-bold text-gray-800">Pontos Fracos</h3>
          </div>
          {analysis.analiseIA.pontosFracosRecorrentes.length > 0 ? (
            <ul className="space-y-2">
              {analysis.analiseIA.pontosFracosRecorrentes.map((ponto, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="flex-1">{ponto}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Nenhum ponto fraco identificado</p>
          )}
        </div>
      </div>

      {/* Resumo das Reviews */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📝</span>
          Resumo das Avaliações
        </h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5">
          <p className="text-gray-800 leading-relaxed">
            {analysis.analiseIA.resumoReviews}
          </p>
        </div>
      </div>

      {/* Botão de Nova Análise */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => (window.location.href = '/')}
          className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Analisar Outro Produto
        </button>
      </div>
    </div>
  );
}
