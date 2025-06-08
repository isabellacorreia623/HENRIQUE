import { useState, useEffect } from 'react';

function AdviceCard() {
  const [advice, setAdvice] = useState('');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const getAdvice = async () => {
      try {
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        setAdvice(data.slip.advice);
      } catch (error) {
        console.error('Erro ao buscar conselho:', error);
        setAdvice('Erro ao buscar conselho.');
      }
    };
    getAdvice();
  }, []);

  const traduzirTexto = async () => {
    setLoading(true);
    setErro('');
    try {
      const res = await fetch('https://google-translate113.p.rapidapi.com/api/v1/translator/text', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '51e79270e9msh092845a981011f5p102724jsn794265337b2d',
          'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
        },
        body: JSON.stringify({
          from: 'en',
          to: 'pt',
          text: advice
        })
      });

      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      // Ajuste conforme a estrutura da resposta da API:
      const textoTraduzido = data.trans || data.translated_text || data.data?.translatedText;

      if (textoTraduzido) {
        setTranslated(textoTraduzido);
      } else {
        throw new Error('Resposta inesperada da API de tradução.');
      }

    } catch (error) {
      console.error('Erro na tradução:', error);
      setErro('Erro ao traduzir o texto. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Conselho (Original):</h2>
      <p className="text-gray-700 italic">{advice}</p>

      <button
        onClick={traduzirTexto}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        disabled={loading}
      >
        {loading ? 'Traduzindo...' : 'Traduzir para Português'}
      </button>

      {translated && (
        <>
          <h2 className="text-xl font-bold text-gray-800">Conselho (Traduzido):</h2>
          <p className="text-black">{translated}</p>
        </>
      )}

      {erro && <p className="text-red-600">{erro}</p>}
    </div>
  );
}

export default AdviceCard;
