import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RandomAdvice from './pages/RandomAdvice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advice" element={<RandomAdvice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
