import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { HeaderProps } from '../types';

export default function Header({ title = 'Review Analyzer' }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo e Título */}
          <div>
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
            </Link>
            <p className="text-blue-100 mt-1 text-sm lg:text-base">
              Análise de sentimento de reviews usando IA
            </p>
          </div>

          {/* Navegação e Auth */}
          <div className="flex items-center gap-3">
            <nav className="flex gap-3">
              <Link
                to="/"
                className="px-3 lg:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-sm lg:text-base"
              >
                Início
              </Link>
              <Link
                to="/history"
                className="px-3 lg:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-sm lg:text-base"
              >
                Histórico
              </Link>
            </nav>

            {/* Auth UI */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-3 pl-3 border-l border-white/30">
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-blue-100">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 lg:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium text-sm"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex gap-2 ml-3 pl-3 border-l border-white/30">
                <Link
                  to="/login"
                  className="px-3 lg:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium text-sm"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="px-3 lg:px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <h1 className="text-xl font-bold">{title}</h1>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 py-4 border-t border-white/20 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium"
              >
                Início
              </Link>
              <Link
                to="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium"
              >
                Histórico
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 bg-white/10 rounded-lg">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-blue-100">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium text-center"
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-center"
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
