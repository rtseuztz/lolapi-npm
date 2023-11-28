import 'dotenv/config';
import RiotAPIClient from '../../client/RiotAPIClient';
import { Body, Response } from 'node-fetch';
import fetch from 'jest-fetch-mock';
import RiotQuery from '../../tools/RiotQuery';
//mock the native fetch function
// global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))
describe('RiotQuery', () => {
    let client: RiotAPIClient;
    let goodResponse: Promise<any>;
    let badResponse: Promise<any>;
    let rateLimitedResponse: Promise<any>;
    let rq: RiotQuery;
    beforeEach(() => {
        client = new RiotAPIClient(process.env.API_KEY!, 1, 1);
        rq = new RiotQuery(1, 1, 'RGAPI-123');
        goodResponse = Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ data: 'hi' }),
        });
        badResponse = Promise.resolve({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });
        rateLimitedResponse = Promise.resolve({
            ok: false,
            status: 429,
            statusText: 'Rate Limit Exceeded',
        });
    });

    it('should query the Riot API', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(goodResponse));
        const url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/hi';
        const body: any = await rq.query(url);
        expect(body.data).toBe('hi');
    });
    it('should throw an error if the response is not ok', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(badResponse));
        const url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/hi';
        fetch.mockResponseOnce(JSON.stringify(badResponse));
        await badResponse;
        await expect(rq.query(url)).rejects.toThrowError('Error 404: Not Found');
    });
    it('should wait 1 second if the response is rate limited', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(rateLimitedResponse));
        const url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/hi';
        await expect(rq.query(url)).rejects.toThrowError('Error 429: Rate Limit Exceeded');
    });
});
