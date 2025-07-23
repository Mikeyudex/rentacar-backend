import { config } from 'dotenv';
config();


export function getAllowedOrigins(): string[] {
  const env = process.env.ENV;

  if (env === 'LOCAL' || env === 'DEV') {
    return ['http://localhost:3000', 'http://localhost:3001'];
  }

  if (env === 'PROD') {
    return ['https://erp.totalmotors.cl'];
  }

  return [];
}