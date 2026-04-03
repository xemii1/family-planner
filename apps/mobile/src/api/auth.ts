import { api } from './client';
import type { RegisterInput, LoginInput, VerifyEmailInput, AuthResponse, User } from '@family-planner/types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const authApi = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  },

  async verifyEmail(input: VerifyEmailInput): Promise<void> {
    const response = await fetch(`${API_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Email verification failed');
    }
  },

  async logout(): Promise<void> {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed');
    }
  },

  async getCurrentUser(): Promise<User | null> {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  },
};
