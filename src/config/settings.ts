const settings = {
  PORT: Number(process.env.PORT || 3000),
  DOMAIN: process.env.DOMAIN || "localhost",
  PROTOCOL: process.env.PROTOCOL || "http",
  NODE_ENV: process.env.APP_ENV || "development",
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
};

export default settings;
