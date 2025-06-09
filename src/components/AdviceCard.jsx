import { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext'; // <-- ADICIONADO

function AdviceCard() {
  const [advice, setAdvice] = useState('');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // <-- ADICIONADO

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

  const handleFavorite = () => { // <-- ADICIONADO
    if (isFavorite(advice)) {
      removeFavorite(advice);
    } else {
      addFavorite(advice);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center">Conselho do Dia</h1>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Conselho (Original):</h2>
          <p className="text-gray-700 italic">{advice}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={traduzirTexto}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition duration-200"
            disabled={loading}
          >
            {loading ? 'Traduzindo...' : 'Traduzir para Português'}
          </button>

          {/* BOTÃO DE FAVORITO */}
          <button
            onClick={handleFavorite}
            className={`${
              isFavorite(advice) ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white font-medium py-2 px-6 rounded-xl transition duration-200`}
          >
            {isFavorite(advice) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>
        </div>

        {translated && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Conselho (Traduzido):</h2>
            <p className="text-gray-900">{translated}</p>
          </div>
        )}

        {erro && <p className="text-red-600 text-center">{erro}</p>}
      </div>
    </div>
  );
}

export default AdviceCard;
