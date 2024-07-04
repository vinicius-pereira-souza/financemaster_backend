import "dotenv/config";

export default {
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  jwt_secret: process.env.JWT_SECRET,
};
