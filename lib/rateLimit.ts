interface RateLimitRecord { count: number; resetAt: number }

const store = new Map<string, RateLimitRecord>();

// Purge expired entries every 10 minutes to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, rec] of store) {
    if (now > rec.resetAt) store.delete(key);
  }
}, 10 * 60 * 1000).unref();

export function rateLimit(
  key: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const rec = store.get(key);

  if (!rec || now > rec.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (rec.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }

  rec.count++;
  return { allowed: true, remaining: maxAttempts - rec.count };
}

export function resetLimit(key: string) {
  store.delete(key);
}
