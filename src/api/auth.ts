
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to sign up');
    }
    throw new Error('Failed to sign up');
  }
};

export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/signin`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to sign in');
    }
    throw new Error('Failed to sign in');
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/signout`);
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};

// For development/testing purposes, provide mock implementations
export const mockSignIn = (email: string, password: string): Promise<AuthResponse> => {
  return Promise.resolve({
    user: {
      id: '1',
      email,
      name: email.split('@')[0],
    },
    token: 'mock-jwt-token'
  });
};

export const mockSignUp = (name: string, email: string, password: string): Promise<AuthResponse> => {
  return Promise.resolve({
    user: {
      id: Date.now().toString(),
      email,
      name,
    },
    token: 'mock-jwt-token'
  });
};
