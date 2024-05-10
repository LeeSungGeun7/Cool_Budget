import Redis, {RedisOptions} from 'ioredis';



const redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10),
    password: process.env.REDIS_PASSWORD,
  };
  
  const redis = new Redis(redisOptions);
 
export default redis;