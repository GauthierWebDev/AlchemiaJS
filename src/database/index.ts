import { database } from "@/config";
import { Logger } from "@/utils";
import SQLite from "./SQLite";

const databases = [SQLite];

const selectedDatabase = databases.find(
  (Database) => Database.dbname === database.client
);

if (!selectedDatabase) {
  Logger.setTitle("Database")
    .addMessage(`Database "${database.client}" not found`)
    .send();
  process.exit(1);
}

export default new selectedDatabase();
