
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

export interface AuthError {
  message: string;
  code?: string;
}

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        message: error.response.data.message || 'Failed to sign up',
        code: error.response.data.code || 'unknown_error'
      };
    }
    throw { message: 'Failed to sign up', code: 'network_error' };
  }
};

export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/signin`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || 'Failed to sign in';
      const errorCode = error.response.data.code || 
        (errorMessage.toLowerCase().includes('not found') || errorMessage.toLowerCase().includes('no user') ? 
        'user_not_found' : 'auth_error');
      
      throw { message: errorMessage, code: errorCode };
    }
    throw { message: 'Failed to sign in', code: 'network_error' };
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
  // Get stored users from localStorage to allow persistent mock data
  const storedUsers = localStorage.getItem('tulsi-mock-users');
  const mockUsers = storedUsers ? JSON.parse(storedUsers) : [
    { id: '1', email: 'user@example.com', name: 'Test User', password: 'password123' },
    { id: '2', email: 'admin@example.com', name: 'Admin User', password: 'admin123' }
  ];
  
  const user = mockUsers.find((u: any) => u.email === email);
  
  if (!user) {
    return Promise.reject({ message: 'User not found', code: 'user_not_found' });
  }
  
  if (user.password !== password) {
    return Promise.reject({ message: 'Invalid password', code: 'invalid_credentials' });
  }
  
  return Promise.resolve({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token: 'mock-jwt-token'
  });
};

export const mockSignUp = (name: string, email: string, password: string): Promise<AuthResponse> => {
  // Get stored users from localStorage to allow persistent mock data
  const storedUsers = localStorage.getItem('tulsi-mock-users');
  let mockUsers = storedUsers ? JSON.parse(storedUsers) : [
    { id: '1', email: 'user@example.com', name: 'Test User', password: 'password123' },
    { id: '2', email: 'admin@example.com', name: 'Admin User', password: 'admin123' }
  ];
  
  if (mockUsers.some((u: any) => u.email === email)) {
    return Promise.reject({ message: 'Email already in use', code: 'email_exists' });
  }
  
  // Create a new user and add it to our mock database
  const newUser = {
    id: Date.now().toString(),
    email,
    name,
    password
  };
  
  mockUsers.push(newUser);
  
  // Store updated users in localStorage
  localStorage.setItem('tulsi-mock-users', JSON.stringify(mockUsers));
  
  return Promise.resolve({
    user: {
      id: newUser.id,
      email,
      name,
    },
    token: 'mock-jwt-token'
  });
};
