import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RandomAdvice from './pages/RandomAdvice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advice" element={<RandomAdvice />} />
      </Routes>
    </Router>
  );
}

export default App;
