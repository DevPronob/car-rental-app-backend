import dotenv from 'dotenv';

dotenv.config();

interface IEnvConfig {
  PORT: string;
  MONGO_URL: string;
  NODE_ENV: 'development' | 'production';
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID:string;
  GOOGLE_CLIENT_SECRET:string
GOOGLE_CALLBACK_URL:string
}

console.log('PORT =', process.env.PORT); // Check if undefined
console.log('MONGO_URL =', process.env.MONGO_URL); // Check if undefined
const loadVars = (): IEnvConfig => {
  const vars = ['PORT', 'MONGO_URL', 'NODE_ENV', 'JWT_SECRET'];
  vars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is not defined`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    MONGO_URL: process.env.MONGO_URL as string,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    JWT_SECRET: process.env.JWT_SECRET as string,
      GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET as string,
GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL as string
  };
};

export const envConfig = loadVars();
