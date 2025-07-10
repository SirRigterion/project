import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNavItems = useCallback(async (retries = 3, delay = 1000) => {
    try {
      setLoading(true);
      setNavItems([]);
      const response = await axios.get('/path/navitems');
      if (!Array.isArray(response.data) || response.data.length === 0) {
        throw new Error('Данные навигации пусты или некорректны');
      }
      setNavItems(response.data);
      setError(null);
      return true;
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchNavItems(retries - 1, delay);
      }
      setError(err.message || 'Не удалось загрузить данные.');
      setNavItems([]);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch navigation items once on mount
  useEffect(() => {
    fetchNavItems();
  }, [fetchNavItems]);

  return (
    <NavContext.Provider value={{ navItems, loading, error, fetchNavItems }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useNav должен использоваться внутри NavProvider');
  }
  return context;
};