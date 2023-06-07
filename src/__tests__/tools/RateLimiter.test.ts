
import RateLimiter, { Droplet } from '../../tools/RateLimiter';

describe('RateLimiter', () => {
    it('should create a RateLimiter', () => {
        const limiter = new RateLimiter(1, 1);
        expect(limiter).toBeInstanceOf(RateLimiter);
    });

    it('should create a RateLimiter with the correct leak rate', () => {
        const limiter = new RateLimiter(1, 1);
        expect(limiter.leakRate).toBe(1000);
    });

    it('should add a request to the bucket', () => {
        const limiter = new RateLimiter(1, 1);
        const request: Droplet = () => { return Promise.resolve() };
        limiter.addRequest(request);
        expect(limiter.bucket.length).toBe(1);
    });

    it('should remove a request from the bucket after the leak interval', (done) => {
        const limiter = new RateLimiter(1, 1);
        const request: Droplet = () => { return Promise.resolve() };
        limiter.addRequest(request);
        expect(limiter.bucket.length).toBe(1);
        setTimeout(() => {
            expect(limiter.bucket.length).toBe(0);
            done();
        }, 1000);
    });

    it('should work with multiple requests', (done) => {
        const limiter = new RateLimiter(1, 1);
        const request: Droplet = () => { return Promise.resolve() };
        limiter.addRequest(request);
        limiter.addRequest(request);
        expect(limiter.bucket.length).toBe(2);
        setTimeout(() => {
            expect(limiter.bucket.length).toBe(1);
        }, 1000);
        setTimeout(() => {
            expect(limiter.bucket.length).toBe(0);
            done();
        }, 2010);
    })
})