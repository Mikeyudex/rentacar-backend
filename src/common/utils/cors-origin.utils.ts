import { config } from 'dotenv';
config();


export function getAllowedOrigins(): string[] {
  const env = process.env.ENV;
  console.log('Env: ', env);
  
  if (env === 'local' || env === 'dev') {
    return ['http://localhost:3000', 'http://localhost:3001'];
  }

  if (env === 'prod') {
    return ['https://erp.totalmotors.cl'];
  }

  return [];
}