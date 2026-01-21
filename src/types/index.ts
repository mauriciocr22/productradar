export interface TestSentimentRequest {
  text: string;
}

export interface TextSentimentResponse {
  success: boolean;
  message?: string;
  data?: {
    input: string;
    sentiment: string;
    usage?: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
  };
  error?: string;
}

export type SentimentType = 'positive' | 'negative' | 'neutral';

export interface Review {
  id: string;
  content: string;
  sentiment: SentimentType;
  score: number;
  createdAt: string;
}

// Nova estrutura de dados
export interface Produto {
  nome: string;
  descricaoResumida: string;
  preco: number;
  vendedor: string;
}

export interface DistribuicaoEstrelas {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
}

export interface Metricas {
  mediaEstrelas: number;
  totalAvaliacoes: number;
  reviewsAnalisados: number;
  distribuicaoEstrelas: DistribuicaoEstrelas;
}

export interface AnaliseIA {
  sentimentoGeral: string;
  pontosFortesRecorrentes: string[];
  pontosFracosRecorrentes: string[];
  resumoReviews: string;
  recomendacao: string;
  scoreConfiabilidade: number;
}

export interface Analysis {
  id: string;
  url: string;
  createdAt: string;
  // Nova estrutura
  produto: Produto;
  metricas: Metricas;
  analiseIA: AnaliseIA;
  // Campos legados (manter para compatibilidade temporária)
  productName?: string;
  sentiment?: SentimentType;
  score?: number;
  summary?: string;
  reviewCount?: number;
  reviews?: Review[];
}

export interface AnalyzeRequestBody {
  url: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: Analysis;
  error?: SentimentType;
}

export interface HistoryResponse {
  success: boolean;
  data?: {
    count: number;
    analyses: Analysis[];
  };
  error?: string;
}

// components

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export interface AnalysisResultProps {
  analysis: Analysis;
}

export interface ReviewItemProps {
  review: Review;
}

export interface EmptyStateProps {
  message?: string;
  icon?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export interface HeaderProps {
  title?: string;
}

// Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
