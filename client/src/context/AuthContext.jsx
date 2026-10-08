import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devpulse_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('devpulse_token') || null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('devpulse_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('devpulse_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.error('Session verification failed:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token: receivedToken, user: receivedUser } = res.data;
      localStorage.setItem('devpulse_token', receivedToken);
      localStorage.setItem('devpulse_user', JSON.stringify(receivedUser));
      setToken(receivedToken);
      setUser(receivedUser);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {
    setAuthError(null);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { token: receivedToken, user: receivedUser } = res.data;
      localStorage.setItem('devpulse_token', receivedToken);
      localStorage.setItem('devpulse_user', JSON.stringify(receivedUser));
      setToken(receivedToken);
      setUser(receivedUser);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const demoLogin = async () => {
    setAuthError(null);
    try {
      const res = await api.post('/auth/demo-login');
      const { token: receivedToken, user: receivedUser } = res.data;
      localStorage.setItem('devpulse_token', receivedToken);
      localStorage.setItem('devpulse_user', JSON.stringify(receivedUser));
      setToken(receivedToken);
      setUser(receivedUser);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Demo login failed.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('devpulse_token');
    localStorage.removeItem('devpulse_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        authError,
        setAuthError,
        login,
        register,
        demoLogin,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
