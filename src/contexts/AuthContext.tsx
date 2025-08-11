
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Importa a instância 'auth' já inicializada

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// O valor padrão do contexto é undefined para podermos verificar se o provider foi usado.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged usa a instância 'auth' importada para observar as mudanças.
    // Isso garante que estamos usando o mesmo objeto de autenticação em toda a aplicação.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Limpa a inscrição ao desmontar o componente para evitar vazamentos de memória.
    return () => unsubscribe();
  }, []);
  
  const signOut = async () => {
    // O signOut também usa a mesma instância 'auth' para garantir consistência.
    await firebaseSignOut(auth);
    // O observador onAuthStateChanged cuidará de atualizar o estado do usuário para null.
  };
  
  const value = { user, loading, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para consumir o contexto de autenticação.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Isso garante que o hook só possa ser usado dentro de um AuthProvider.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
