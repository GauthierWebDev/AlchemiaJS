export default {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  COOKIE_DAYS_DURATION: Number(process.env.COOKIE_DAYS_DURATION) || 1,
  ENCRYPTOR_SECRET: process.env.ENCRYPTOR_SECRET || 'nobodyknows',
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret',
};
