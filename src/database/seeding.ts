import database from "@/database";
import { Logger } from "@/utils";

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

const posts = [
  { id: 1, title: "Hello World", user_id: 1 },
  { id: 2, title: "Hello World 2", user_id: 1 },
  { id: 3, title: "Hello World 3", user_id: 2 },
];

(async () => {
  Logger.setTitle("🌱 Seeding").addMessage("Drop user and post tables").send();

  await Promise.all([
    database.query("DROP TABLE IF EXISTS user;"),
    database.query("DROP TABLE IF EXISTS post;"),
  ]);

  Logger.setTitle("🌱 Seeding")
    .addMessage("Creating user and post tables")
    .send();
  await Promise.all([
    database.query("CREATE TABLE user (id INTEGER, name TEXT);"),
    database.query(
      "CREATE TABLE post (id INTEGER, title TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES user (id));"
    ),
  ]);

  Logger.setTitle("🌱 Seeding").addMessage("Insert users in user table").send();
  await Promise.all([
    ...users.map((user) => {
      return database.query(
        `INSERT INTO user (id, name) VALUES (${user.id}, '${user.name}');`
      );
    }),
  ]);

  Logger.setTitle("🌱 Seeding").addMessage("Insert posts in post table").send();
  await Promise.all([
    ...posts.map((post) => {
      return database.query(
        `INSERT INTO post (id, title, user_id) VALUES (${post.id}, '${post.title}', ${post.user_id});`
      );
    }),
  ]);

  Logger.setTitle("🌱 Seeding").addMessage("Seeding done!").send();
})();
