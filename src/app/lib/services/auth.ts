import { sign, verify } from 'jsonwebtoken';
import { db } from '../database';
import type { LoginCredentials, AuthResponse, JWTPayload } from '../../types/index';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async validateCredentials(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { username, password } = credentials;
      const user = db.getUserByUsername(username);

      if (!user) {
        return {
          success: false,
          message: 'Informations de connexion invalides'
        };
      }

      if (user.blocked) {
        return {
          success: false,
          message: 'Ce compte a été bloqué.'
        };
      }

      if (user.password !== password) {
        return {
          success: false,
          message: 'Informations de connexion invalides'
        };
      }

      const token = this.generateToken(username);

      return {
        success: true,
        token
      };
    } catch (error) {
      console.error('Auth error:', error);
      return {
        success: false,
        message: 'Une erreur est survenue'
      };
    }
  }

  public verifyToken(token: string): JWTPayload | null {
    try {
      return verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  private generateToken(username: string): string {
    return sign({ username }, JWT_SECRET, { expiresIn: '24h' });
  }
}

export const authService = AuthService.getInstance();