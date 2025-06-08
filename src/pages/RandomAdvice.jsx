import { useState, useEffect } from 'react';

function RandomAdvice() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      const data = await res.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      setAdvice('Erro ao carregar conselho.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-600 text-white px-4">
      <div className="bg-white text-gray-800 p-8 rounded-xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Conselho Aleatório</h2>
        {loading ? (
          <p className="animate-pulse">Carregando...</p>
        ) : (
          <p className="italic text-lg">"{advice}"</p>
        )}
        <button
          onClick={fetchAdvice}
          className="mt-6 px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Novo Conselho
        </button>
      </div>
    </div>
  );
}

export default RandomAdvice;
