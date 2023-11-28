import Summoner from '../../models/Summoner';
import RiotQuery from '../../tools/RiotQuery';
import RiotAPIClient from '../../client/RiotAPIClient';
const summonerObj = new Summoner('accountId', 1, 1, 'name', 'id', 'puuid', 1);

describe('RateLimiter', () => {
    let client: RiotAPIClient;
    beforeEach(() => {
        client = new RiotAPIClient('RGAPI-123', 1, 1);
    });
    it('should create the client', () => {
        expect(client).toBeInstanceOf(RiotAPIClient);
    });
    describe('summoner', () => {
        beforeAll(() => {
            jest.spyOn(RiotQuery.prototype, 'query').mockReturnValue(Promise.resolve(summonerObj));
        });
        it('should get a Summoner by name', async () => {
            const summoner = await client.summoner.getByName('rtseuztz');
            expect(summoner.name).toBe('name');
        });
        it('should get a Summoner by accountId', async () => {
            const summoner = await client.summoner.getByAccountId('accountId');
            expect(summoner.accountId).toBe('accountId');
        });
        it('should get a Summoner by puuid', async () => {
            const summoner = await client.summoner.getByPuuid('puuid');
            expect(summoner.puuid).toBe('puuid');
        });
        it('should get a Summoner by id', async () => {
            const summoner = await client.summoner.getBySummonerId('id');
            expect(summoner.id).toBe('id');
        });
    });
});
