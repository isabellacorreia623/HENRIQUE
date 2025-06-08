import { useState, useEffect } from 'react';

function RandomAdvice() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [translating, setTranslating] = useState(false);

  // Pega conselho em inglês
  const fetchAdvice = async () => {
    setLoading(true);
    setTranslated(false);
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

  // Pede tradução ao backend que chama Localazy
  const translateToPortuguese = async () => {
    if (!advice) return;
    setTranslating(true);

    try {
      const res = await fetch('http://localhost:3001/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: advice, source: 'en', target: 'pt' }),
      });

      if (!res.ok) {
        setAdvice('Erro ao traduzir o conselho.');
        setTranslating(false);
        return;
      }

      const data = await res.json();

      if (data.translated) {
        setAdvice(data.translated);
        setTranslated(true);
      } else {
        setAdvice('Erro ao traduzir o conselho.');
      }
    } catch {
      setAdvice('Erro ao traduzir o conselho.');
    } finally {
      setTranslating(false);
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
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={fetchAdvice}
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
            disabled={loading || translating}
          >
            Novo Conselho
          </button>
          <button
            onClick={translateToPortuguese}
            className={`px-4 py-2 font-semibold rounded-lg transition ${
              translated
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
            }`}
            disabled={loading || translating || translated}
          >
            {translating ? 'Traduzindo...' : translated ? 'Traduzido' : 'Traduzir para Português'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomAdvice;
