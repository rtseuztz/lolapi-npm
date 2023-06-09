import RateLimiter, { AsyncFunction, Droplet } from '../../tools/RateLimiter';
describe('RateLimiter', () => {
    let limiter: RateLimiter;
    beforeEach(() => {
        limiter = new RateLimiter(1, 1);
    });
    it('should create a RateLimiter', () => {
        expect(limiter).toBeInstanceOf(RateLimiter);
    });

    it('should create a RateLimiter with the correct leak rate', () => {
        expect(limiter.leakDelayInMs).toBe(1000);
    });

    it('should add a request to the bucket', () => {
        const request: AsyncFunction = () => {
            return Promise.resolve('hi');
        };
        limiter.addRequest(request);
        expect(limiter.bucket.length).toBe(1);
    });

    it('should remove a request from the bucket after the leak interval', async () => {
        const request: AsyncFunction = () => {
            return Promise.resolve('hi');
        };
        const start = Date.now();
        const res = await limiter.addRequest(request);
        expect(Date.now() - start).toBeLessThan(1020);
        expect(res).toBe('hi');
    });

    it('should work with multiple requests', async () => {
        const request1: AsyncFunction = () => {
            return Promise.resolve('hi1');
        };
        const request2: AsyncFunction = () => {
            return Promise.resolve('hi2');
        };
        const req1 = limiter.addRequest(request1);
        const req2 = limiter.addRequest(request2);
        const start = Date.now();
        const res = await Promise.all([req1, req2]);
        expect(Date.now() - start).toBeLessThan(2100);
        expect(res[0]).toBe('hi1');
        expect(res[1]).toBe('hi2');
    });
    it('should work with a ton of requests', async () => {
        limiter = new RateLimiter(100, 1);
        const request: AsyncFunction = () => {
            return Promise.resolve('hi');
        };
        const requests: Promise<any>[] = [];
        for (let i = 0; i < 100; i++) {
            requests.push(limiter.addRequest(request));
        }
        const start = Date.now();
        const res = await Promise.all(requests);
        expect(Date.now() - start).toBeLessThan(2000); // should take 1 second, allowing 1 extra for overhead
        expect(res.length).toBe(100);
    });
});
