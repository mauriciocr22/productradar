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

export interface Analysis {
  id: string;
  url: string;
  productName?: string;
  sentiment: SentimentType;
  score: number;
  summary: string;
  reviewCount: number;
  createdAt: string;
  reviews: Review[];
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
