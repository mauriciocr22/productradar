import type {
  AnalysisResponse,
  AnalyzeRequestBody,
  TestSentimentRequest,
  TextSentimentResponse,
} from '../types';

const API_BASE_URL = 'http://localhost:3001';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.json();
  }

  async testSentiment(text: string): Promise<TextSentimentResponse> {
    const response = await fetch(`${this.baseUrl}/api/test-gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text } as TestSentimentRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async analyzeUrl(url: string): Promise<AnalysisResponse> {
    const response = await fetch(`${this.baseUrl}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url } as AnalyzeRequestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}

export default new ApiService();
