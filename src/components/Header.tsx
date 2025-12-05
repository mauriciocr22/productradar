import { Link } from 'react-router-dom';
import type { HeaderProps } from '../types';

export default function Header({ title = 'Review Analyzer' }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo e Título */}
          <div>
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <h1 className="text-3xl font-bold">{title}</h1>
            </Link>
            <p className="text-blue-100 mt-2">
              Análise de sentimento de reviews usando IA
            </p>
          </div>

          {/* Navegação */}
          <nav className="flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium"
            >
              Início
            </Link>
            <Link
              to="/history"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium"
            >
              Histórico
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
