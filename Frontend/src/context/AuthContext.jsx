import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8083/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Verification response:', response.data);
          if (response.data.authenticated) {
            setIsAuthenticated(true);
            setUserEmail(response.data.email);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Verification failed:', error);
          setIsAuthenticated(false);
        }
      }
    };
    verifyToken();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
