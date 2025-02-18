export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
  success: boolean;
}

export interface User {
  username: string;
  blocked: boolean;
}

export interface JWTPayload {
  username: string;
  iat: number;
  exp: number;
}
