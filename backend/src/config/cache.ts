import { LRUCache } from "lru-cache";

export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, ttlSeconds: number): Promise<void>;
  del(key: string): Promise<void>;
}

class LruCacheService implements CacheService {
  private cache: LRUCache<string, Record<string, unknown>>;

  constructor() {
    this.cache = new LRUCache({
      max: 5000,
      ttlAutopurge: true,
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = this.cache.get(key);
    return (value as T) ?? null;
  }

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    this.cache.set(key, value as Record<string, unknown>, { ttl: ttlSeconds * 1000 });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }
}

export const cache: CacheService = new LruCacheService();
