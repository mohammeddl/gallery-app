import { sign, verify } from "jsonwebtoken";
import db from "./db";
import type {
  LoginCredentials,
  AuthResponse,
  JWTPayload,
} from "../types/index";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function validateCredentials(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    const { username, password } = credentials;
    const userKey = `user:${username}`;

    try {
      const userData = await db.get(userKey);
      if (!userData) {
        return {
          success: false,
          message: "Informations de connexion invalides",
        };
      }

      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.blocked) {
        return {
          success: false,
          message: "Ce compte a été bloqué.",
        };
      }

      if (parsedUserData.password !== password) {
        return {
          success: false,
          message: "Informations de connexion invalides",
        };
      }

      const token = sign({ username }, JWT_SECRET, { expiresIn: "24h" });

      return {
        success: true,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: "Informations de connexion invalides",
      };
    }
  } catch (error) {
    console.error("Auth error:", error);
    return {
      success: false,
      message: "Une erreur est survenue",
    };
  }
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}
