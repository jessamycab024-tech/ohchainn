import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiUrl: process.env.API_URL || 'http://localhost:3000',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  jwtExpiry: process.env.JWT_EXPIRY || '24h',

  // Web3
  ethereum: {
    rpcUrl: process.env.ETHEREUM_RPC_URL || '',
    network: process.env.ETHEREUM_NETWORK || 'mainnet',
    contractAddress: process.env.CONTRACT_ADDRESS || '',
    privateKey: process.env.PRIVATE_KEY || '',
    chainId: parseInt(process.env.CHAIN_ID || '1'),
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD || '',
  },

  // Admin
  admin: {
    secret: process.env.ADMIN_SECRET || '',
    email: process.env.ADMIN_EMAIL || 'admin@ohchain.com',
  },

  // Email
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
  },

  // API Keys
  apiKeys: {
    etherscan: process.env.ETHERSCAN_API_KEY || '',
    infura: process.env.INFURA_API_KEY || '',
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
  },
};