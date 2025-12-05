import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import History from './pages/History';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
