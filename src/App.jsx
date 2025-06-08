import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RandomAdvice from './pages/RandomAdvice';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <nav className="bg-blue-600 text-white p-4 flex gap-4 justify-center">
          <Link to="/">Home</Link>
          <Link to="/advice">Conselho Aleatório</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advice" element={<RandomAdvice />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;