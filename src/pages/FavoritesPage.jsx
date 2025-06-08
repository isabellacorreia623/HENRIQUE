import { useFavorites } from '../context/FavoritesContext';

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Favoritos</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-700 text-center">Nenhum conselho favoritado ainda.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded shadow">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;