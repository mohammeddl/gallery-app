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
  password: string;
  blocked: boolean;
}

export interface JWTPayload {
  username: string;
  iat: number;
  exp: number;
}

export interface LikeData {
  username: string;
  imageId: string;
  timestamp: number;
}

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}