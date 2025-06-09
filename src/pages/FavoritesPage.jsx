import { useFavorites } from '../context/FavoritesContext';

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p>Você não tem conselhos favoritos ainda.</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meus Conselhos Favoritos</h1>
      <ul>
        {favorites.map((advice, index) => (
          <li key={index} className="mb-3 p-3 border rounded shadow-sm flex justify-between items-center">
            <p>{advice}</p>
            <button
              onClick={() => removeFavorite(advice)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
