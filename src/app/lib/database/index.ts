// lib/database/index.ts
import Database from 'better-sqlite3';
import path from 'path';
import type { User } from '../../types/index';

class DatabaseService {
  private db: Database.Database;
  private static instance: DatabaseService;

  private constructor() {
    this.db = new Database(path.join(process.cwd(), 'database.db'));
    this.initializeTables();
    this.initializeTestUsers();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private initializeTables(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        password TEXT,
        blocked INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS likes (
        username TEXT,
        imageId TEXT,
        timestamp INTEGER,
        PRIMARY KEY (username, imageId)
      );
    `);
  }

  private initializeTestUsers(): void {
    const testUsers = [
      { username: 'muser1', password: 'mpassword1', blocked: 0 },
      { username: 'muser2', password: 'mpassword2', blocked: 0 },
      { username: 'muser3', password: 'mpassword3', blocked: 1 }
    ];

    const insertUser = this.db.prepare(`
      INSERT OR IGNORE INTO users (username, password, blocked) 
      VALUES (@username, @password, @blocked)
    `);

    const transaction = this.db.transaction((users) => {
      for (const user of users) {
        insertUser.run(user);
      }
    });

    transaction(testUsers);
  }

  public prepare(sql: string): Database.Statement {
    return this.db.prepare(sql);
  }

  public getUserByUsername(username: string): User | undefined {
    const stmt = this.prepare('SELECT * FROM users WHERE username = ?');
    const result = stmt.get(username) as any;
    
    if (!result) return undefined;

    return {
      username: result.username,
      password: result.password,
      blocked: result.blocked === 1
    };
  }
}

export const db = DatabaseService.getInstance();