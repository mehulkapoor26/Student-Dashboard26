import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getActiveSession,
  setActiveSession,
  authenticateStudent,
  registerStudent,
  updateStudentProfile
} from '../components/auth/authStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getActiveSession());
  const [loading, setLoading] = useState(false);

  const login = async (identifier, password) => {
    setLoading(true);
    try {
      // Realistic brief delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      const user = authenticateStudent(identifier, password);
      setActiveSession(user);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const newUser = registerStudent(formData);
      setActiveSession(newUser);
      setCurrentUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setActiveSession(null);
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    const saved = updateStudentProfile(updatedData);
    setCurrentUser(saved);
    return saved;
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    loading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
