/**
 * This class uses the leaky bucket algorithm to limit the rate of requests to a certain number per second.
 */
export default class RateLimiter {
    private requests: number
    private seconds: number

    readonly bucket: Droplet[] = []
    readonly leakRate: number
    private leakInterval: NodeJS.Timeout
    constructor(requests: number, seconds: number) {
        this.requests = requests
        this.seconds = seconds

        this.leakRate = this.requests / this.seconds * 1000
        this.leakInterval = setInterval(() => {
            this.leak();
        }, this.leakRate)
    }

    addRequest(request: Droplet) {
        this.bucket.push(request);
    }

    private leak() {
        const droplet = this.bucket.shift();
        if (!droplet) return;

    }
}

export interface Droplet {
    (): Promise<any>
}