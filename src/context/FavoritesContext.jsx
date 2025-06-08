import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (advice) => {
    if (!favorites.includes(advice)) {
      setFavorites([...favorites, advice]);
    }
  };

  const removeFavorite = (advice) => {
    setFavorites(favorites.filter(item => item !== advice));
  };

  const isFavorite = (advice) => favorites.includes(advice);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}