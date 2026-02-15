import React, { createContext, useState, useContext } from 'react';

type UserRole = 'user' | 'volunteer' | 'organizer' | 'admin' | null;

interface AuthContextType {
  userRole: UserRole;
  userEmail: string | null;
  setUserRole: (role: UserRole) => void;
  setUserEmail: (email: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const logout = () => {
    setUserRole(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, userEmail, setUserRole, setUserEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};