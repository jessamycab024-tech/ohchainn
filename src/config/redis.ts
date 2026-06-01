import { createClient } from 'redis';
import { config } from './index';
import logger from './logger';

let redisClient: any = null;

export const initRedis = async () => {
  try {
    redisClient = createClient({
      url: config.redis.url,
      password: config.redis.password,
    });

    redisClient.on('error', (err: any) => {
      logger.error('Redis Client Error', err);
    });

    redisClient.on('connect', () => {
      logger.info('Redis Client Connected');
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
};

export default redisClient;