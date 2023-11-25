export default {
  client: process.env.DB_CLIENT || "sqlite3",
  connection: {
    filename: process.env.DB_FILENAME || "database.sqlite",
  },
  useNullAsDefault: true,
};
