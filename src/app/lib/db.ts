import { Level } from "level";

const db = new Level("./db", { valueEncoding: "json" });

export async function initializeTestUsers() {
  try {
    const users = {
      muser1: { password: "mpassword1", blocked: false },
      muser2: { password: "mpassword2", blocked: false },
      muser3: { password: "mpassword3", blocked: true },
    };

    for (const [username, userData] of Object.entries(users)) {
      const key = `user:${username}`;
      try {
        await db.get(key);
      } catch (error) {
        await db.put(key, JSON.stringify(userData));
      }
    }
  } catch (error) {
    console.error("Error initializing test users:", error);
  }
}

export default db;
