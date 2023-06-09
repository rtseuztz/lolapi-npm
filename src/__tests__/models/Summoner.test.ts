import RiotAPIClient from '../../client/RiotAPIClient';
import Summoner from '../../models/Summoner';
import RiotQuery from '../../tools/RiotQuery';
//create a client then mock its querier
const client = new RiotAPIClient('RGAPI-123', 1, 1);
const summonerObj = new Summoner('accountId', 1, 1, 'name', 'id', 'puuid', 1);
jest.spyOn(RiotQuery.prototype, 'query').mockReturnValue(Promise.resolve(summonerObj));
describe('Summoner', () => {
    let summoner: Summoner;
    beforeEach(() => {
        summoner = structuredClone(summonerObj);
    });

    it('should create a Summoner with the correct accountId', () => {
        expect(summoner.accountId).toBe('accountId');
    });

    it('should create a Summoner with the correct profileIconId', () => {
        expect(summoner.profileIconId).toBe(1);
    });

    it('should create a Summoner with the correct revisionDate', () => {
        expect(summoner.revisionDate).toBe(1);
    });

    it('should create a Summoner with the correct name', () => {
        expect(summoner.name).toBe('name');
    });

    it('should create a Summoner with the correct id', () => {
        expect(summoner.id).toBe('id');
    });

    it('should create a Summoner with the correct puuid', () => {
        expect(summoner.puuid).toBe('puuid');
    });

    it('should create a Summoner with the correct summonerLevel', () => {
        expect(summoner.summonerLevel).toBe(1);
    });
    // describe('get with mocked RiotQuery', () => {
    //     it('should get a Summoner by name', async () => {
    //         const summoner = await Summoner.getByName('rtseuztz');
    //         expect(summoner).toBeInstanceOf(Summoner);
    //     });
    //     it('should get a Summoner by accountId', async () => {
    //         const summoner = await Summoner.getByAccountId('accountId');
    //         expect(summoner.accountId).toBe('accountId');
    //     });
    //     it('should get a Summoner by puuid', async () => {
    //         const summoner = await Summoner.getByPuuid('puuid');
    //         expect(summoner.puuid).toBe('puuid');
    //     });
    //     it('should get a Summoner by id', async () => {
    //         const summoner = await Summoner.getBySummonerId('id');
    //         expect(summoner.id).toBe('id');
    //     });
    // });
});
