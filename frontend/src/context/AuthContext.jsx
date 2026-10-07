import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Sushmitha S',
    role: 'student',
    email: 'student@example.com'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role) {
      document.documentElement.setAttribute('data-theme', user.role);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [user]);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
