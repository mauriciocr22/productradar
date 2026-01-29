import { useState } from 'react';
import type { URLInputProps } from '../types';

export default function URLInput({
  onSubmit,
  isLoading = false,
}: URLInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-3 md:gap-4">
        <label htmlFor="url" className="text-base md:text-lg font-semibold text-gray-700">
          Cole a URL do produto:
        </label>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemplo.com/produto"
            disabled={isLoading}
            className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            {isLoading ? 'Analisando...' : 'Analisar'}
          </button>
        </div>
      </div>
    </form>
  );
}
