import type {
  AnalysisResponse,
  AnalyzeRequestBody,
  HistoryResponse,
  TestSentimentRequest,
  TextSentimentResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.json();
  }

  // Teste de analise de sentimento
  async testSentiment(text: string): Promise<TextSentimentResponse> {
    const response = await fetch(`${this.baseUrl}/api/test-gemini`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ text } as TestSentimentRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Analisa URL
  async analyzeUrl(url: string): Promise<AnalysisResponse> {
    const response = await fetch(`${this.baseUrl}/api/analyze`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ url } as AnalyzeRequestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Lista análises
  async getHistory(): Promise<HistoryResponse> {
    const response = await fetch(`${this.baseUrl}/api/history`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Análise Única
  async getAnalysis(id: string): Promise<AnalysisResponse> {
    const response = await fetch(`${this.baseUrl}/api/analysis/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}

export default new ApiService();
