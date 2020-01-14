require('../bootstrap');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV !== 'test' ? false : false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
