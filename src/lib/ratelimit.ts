export class RateLimiter {
    private queue: (() => Promise<void>)[] = [];
    private activeRequests = 0;
    private readonly maxRequests: number;
    private readonly interval: number;
  
    constructor(maxRequests: number, interval: number) {
      this.maxRequests = maxRequests;
      this.interval = interval;
    }
  
    public async limit(fn: () => Promise<void>): Promise<void> {
      this.queue.push(fn);
      this.processQueue();
    }
  
    private async processQueue() {
      if (this.activeRequests >= this.maxRequests) {
        return;
      }
  
      const fn = this.queue.shift();
      if (!fn) {
        return;
      }
  
      this.activeRequests++;
      try {
        await fn();
      } finally {
        this.activeRequests--;
        setTimeout(() => this.processQueue(), this.interval);
      }
    }
  }
  