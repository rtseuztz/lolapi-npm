/**
 * This class uses the leaky bucket algorithm to limit the rate of requests to a certain number per second.
 */
export default class RateLimiter {
    private requests: number;
    private seconds: number;

    readonly bucket: Droplet[] = [];
    readonly leakDelayInMs: number;
    private leakInterval: NodeJS.Timeout;
    constructor(requests: number, seconds: number) {
        this.requests = requests;
        this.seconds = seconds;

        this.leakDelayInMs = (this.seconds / this.requests) * 1000;
        this.leakInterval = setInterval(() => {
            this.leak();
        }, this.leakDelayInMs);
    }
    /**
     * Adds a request to the bucket. The function will return a promise that resolves when the request is executed.
     * @param request The request to add to the bucket
     */
    async addRequest(request: AsyncFunction): Promise<any> {
        return new Promise((resolve, reject) => {
            const callback = (res: any) => {
                resolve(res);
            };
            /* 
              Put the user's request in the bucket. 
              The callback will resolve the promise when the request is executed. 
            */
            this.bucket.push({
                function: request,
                leakCallback: callback,
            });
        });
    }

    private async leak() {
        const droplet = this.bucket.shift();
        if (!droplet) return;
        const res = await droplet.function();
        droplet.leakCallback(res);
    }
}

export interface Droplet {
    function: AsyncFunction;
    leakCallback: (res: any) => void;
}
export type AsyncFunction = () => Promise<any>;
