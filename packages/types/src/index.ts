// Shared types for server and client

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type ApiError = {
  status: number;
  message: string;
  code?: string;
};
