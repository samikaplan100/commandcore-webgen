export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'
export const DB_CONFIG = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'penguin_games',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
}