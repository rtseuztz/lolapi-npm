import { Match } from '../models';
import Summoner from '../models/Summoner';
import RiotQuery from '../tools/RiotQuery';

export class RiotAPIClient {
    private api: RiotQuery;
    constructor(apiKey: string, requests: number, seconds: number) {
        this.api = new RiotQuery(requests, seconds, apiKey);
    }
    match = {
        getMatchList: async (puuid: string): Promise<string[]> => {
            const matchList = (await this.api.query(
                `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
            )) as string[];
            return matchList;
        },
        getMatch: async (matchId: string): Promise<Match> => {
            const match = (await this.api.query(
                `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
            )) as Match;
            return match;
        }
    }
    summoner = {
        getByName: async (name: string): Promise<Summoner> => {
            const summoner = (await this.api.query(
                `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
            )) as Summoner;
            return summoner;
        },
        getByAccountId: async (encryptedAccountId: string): Promise<Summoner> => {
            const summoner = (await this.api.query(
                `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${encryptedAccountId}`,
            )) as Summoner;
            return summoner;
        },
        getByPuuid: async (encryptedPUUID: string): Promise<Summoner> => {
            const summoner = (await this.api.query(
                `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encryptedPUUID}`,
            )) as Summoner;
            return summoner;
        },
        getBySummonerId: async (encryptedSummonerId: string): Promise<Summoner> => {
            const summoner = (await this.api.query(
                `https://na1.api.riotgames.com/lol/summoner/v4/summoners/${encryptedSummonerId}`,
            )) as Summoner;
            return summoner;
        }
    }

}
export default RiotAPIClient;