
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  signIn as apiSignIn, 
  signUp as apiSignUp, 
  signOut as apiSignOut, 
  mockSignIn, 
  mockSignUp, 
  AuthError 
} from '@/api/auth';

// Use environment variable to determine if we should use mock APIs
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || true;

type User = {
  id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: AuthError }>;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: AuthError }>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('tulsi-user');
    const token = localStorage.getItem('tulsi-token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = USE_MOCK_API 
        ? await mockSignIn(email, password)
        : await apiSignIn({ email, password });
      
      setUser(response.user);
      localStorage.setItem('tulsi-user', JSON.stringify(response.user));
      localStorage.setItem('tulsi-token', response.token);
      toast.success('Signed in successfully');
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || 'Failed to sign in');
      return { 
        success: false, 
        error: authError
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = USE_MOCK_API
        ? await mockSignUp(name, email, password)
        : await apiSignUp({ name, email, password });
      
      setUser(response.user);
      localStorage.setItem('tulsi-user', JSON.stringify(response.user));
      localStorage.setItem('tulsi-token', response.token);
      toast.success('Account created successfully');
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || 'Failed to create account');
      return { 
        success: false, 
        error: authError
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    if (!USE_MOCK_API) {
      apiSignOut().catch(error => {
        console.error('Error during sign out:', error);
      });
    }
    
    setUser(null);
    localStorage.removeItem('tulsi-user');
    localStorage.removeItem('tulsi-token');
    toast.success('Signed out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
