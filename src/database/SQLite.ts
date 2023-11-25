import { database } from "@/config";
import sqlite3 from "sqlite3";

class SQLite {
  public name: string = "sqlite3";
  private db: sqlite3.Database;
  private driver = sqlite3;

  constructor() {
    this.db = new this.driver.Database(database.connection.filename);
  }

  public query(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  public jsonRelationSyntax(relatedTableName: string) {
    return `json_group_array("${relatedTableName}".*) as "${relatedTableName}"`;
  }
}

export default SQLite;
