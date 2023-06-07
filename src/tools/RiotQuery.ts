import RateLimiter from "./RateLimiter";
import axios, { AxiosResponse } from "axios";
/**
 * This class is used to query the Riot API. It uses the RateLimiter class to limit the rate of requests.
 */
export default class RiotQuery {
    private rateLimiter: RateLimiter;
    constructor(requests: number, seconds: number) {
        this.rateLimiter = new RateLimiter(requests, seconds);
    }

    async query(url: string, returnType: T ): Promise<AxiosResponse<any, any>> {
        const request = async () => {
            const res = await axios.get(url);
            return res.data;
        }
        return await this.rateLimiter.addRequest(request);
    }
}