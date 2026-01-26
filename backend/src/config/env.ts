import { cleanEnv, str, port } from 'envalid';
import dotenv from 'dotenv';

// Load .env file BEFORE validation
dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  PORT: port({ default: 5000 }),
  MONGODB_URI: str({ desc: 'MongoDB connection string' }),
  JWT_SECRET: str({ desc: 'JWT access token secret' }),
  JWT_REFRESH_SECRET: str({ desc: 'JWT refresh token secret' }),
  CLOUDINARY_CLOUD_NAME: str({ desc: 'Cloudinary cloud name', default: '' }),
  CLOUDINARY_API_KEY: str({ desc: 'Cloudinary API key', default: '' }),
  CLOUDINARY_API_SECRET: str({ desc: 'Cloudinary API secret', default: '' }),
});
