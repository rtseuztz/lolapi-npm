import { Response } from 'node-fetch';
import RateLimiter from './RateLimiter';

/**
 * This class is used to query the Riot API. It uses the RateLimiter class to limit the rate of requests.
 */
export default class RiotQuery {
    private rateLimiter: RateLimiter;
    private readonly config;
    constructor(requests: number, seconds: number, apiKey: string) {
        this.rateLimiter = new RateLimiter(requests, seconds);
        this.config = {
            headers: {
                'X-Riot-Token': apiKey,
            },
        };
    }

    async query(url: string): Promise<any> {
        const request = async () => {
            const cbRes: globalThis.Response = await fetch(url, this.config);
            return cbRes;
        };
        // the below function returns the above function wrapped in a promise
        const res = (await this.rateLimiter.addRequest(request)) as Response;
        switch (res.status) {
            case 200:
                return await res.json();
            case 429:
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            // console.log("Rate limit exceeded. Waiting 1 second...")
            // await new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         resolve("");
            //     }, 1000)
            // })
            // return await this.query(url);
            default:
                throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
    }
}
