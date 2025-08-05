export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  instrument?: string;
  experience?: string;
  createdAt: string;
}