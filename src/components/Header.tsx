export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">Review Analyzer</h1>
        <p className="text-blue-100 mt-2">
          Análise de sentimento de reviews usando IA
        </p>
      </div>
    </header>
  );
}
