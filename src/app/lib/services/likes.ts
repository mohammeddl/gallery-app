import { db } from '../database';

class LikeService {
  private static instance: LikeService;
  private readonly checkLikeStmt;
  private readonly addLikeStmt;
  private readonly removeLikeStmt;

  private constructor() {
    this.checkLikeStmt = db.prepare(
      'SELECT COUNT(*) as count FROM likes WHERE username = ? AND imageId = ?'
    );
    
    this.addLikeStmt = db.prepare(
      'INSERT OR REPLACE INTO likes (username, imageId, timestamp) VALUES (?, ?, ?)'
    );
    
    this.removeLikeStmt = db.prepare(
      'DELETE FROM likes WHERE username = ? AND imageId = ?'
    );
  }

  public static getInstance(): LikeService {
    if (!LikeService.instance) {
      LikeService.instance = new LikeService();
    }
    return LikeService.instance;
  }

  public isLiked(username: string, imageId: string): boolean {
    const result = this.checkLikeStmt.get(username, imageId) as { count: number };
    return result.count > 0;
  }

  public addLike(username: string, imageId: string): void {
    this.addLikeStmt.run(username, imageId, Date.now());
  }

  public removeLike(username: string, imageId: string): void {
    this.removeLikeStmt.run(username, imageId);
  }
}

export const likeService = LikeService.getInstance();