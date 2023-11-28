import RiotAPIClient from '../client/RiotAPIClient';
import 'dotenv/config';
jest.useRealTimers();
describe('e2e TEST', () => {
    const client = new RiotAPIClient(process.env.API_KEY!, 1, 1);
    describe('summoner', () => {
        it('should get a summoner by name', async () => {
            const summoner = await client.summoner.getByName('riottest');
            expect(summoner.name).toBe('R i o t T e s t');
        });
        it('should get a summoner by accountId', async () => {
            const summoner = await client.summoner.getByAccountId('QAFstkICTju7PnaYFYhIMDx3Ef7x9h5Aobe4esnuSarZjw');
            expect(summoner.name).toBe('R i o t T e s t');
        });
        it('should get a summoner by puuid', async () => {
            const summoner = await client.summoner.getByPuuid(
                'OwgyIL6OJu9MS_u09y_tQzAZPNmXI2SkQWhqOV44pFah2Jrs4rsFg8LFLGpgDQCaY1hLylhNCvqb9w',
            );
            expect(summoner.name).toBe('R i o t T e s t');
        });
        it('should get a summoner by summonerId', async () => {
            const summoner = await client.summoner.getBySummonerId('5o1kVKYflOz-CRaBfvoMIHOvz0rFFXULI4haRRQYyxnAWow');
            expect(summoner.name).toBe('R i o t T e s t');
        });
        // xit('rate limiter supreme test', async () => {
        //     // TO RUN THIS, CHANGE THE RIOT API CLIENT PARAMS TO YOUR RATE LIMIT SET BY RIOT
        //     const promises: Promise<any>[] = [];
        //     for (let i = 0; i < 1500; i++) {
        //         promises.push(client.summoner.getByName("riottest"));
        //     }
        //     const summoners = await Promise.all(promises);
        //     expect(summoners.length).toBe(1500);
        // }, 120000)
    });
    describe('match', () => {
        it('should get a list of match ids by puuid', async () => {
            const matchList: string[] = await client.match.getMatchList(
                'GZvRP1eq90bmEpWYc6wMKzFKgIFGbzT5NcREHAIxJ56hwFbZYDmhOcpMKaTszZL5278fwHyjh9UsXg',
            );
            expect(matchList.length).toBeGreaterThan(0);
        });
        it('should get a list of one match by puuid', async () => {
            const matchList: string[] = await client.match.getMatchList(
                'GZvRP1eq90bmEpWYc6wMKzFKgIFGbzT5NcREHAIxJ56hwFbZYDmhOcpMKaTszZL5278fwHyjh9UsXg',
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                1,
            );
            expect(matchList.length).toBe(1);
        });
    });
    xit('should pass', () => {
        expect(1).toBe(1);
    });
});
