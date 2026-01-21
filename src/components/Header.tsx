import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { HeaderProps } from '../types';

export default function Header({ title = 'Review Analyzer' }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

          {/* Navegação e Auth */}
          <div className="flex items-center gap-4">
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

            {/* Auth UI */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/30">
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-blue-100">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium text-sm"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex gap-2 ml-4 pl-4 border-l border-white/30">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium text-sm"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
