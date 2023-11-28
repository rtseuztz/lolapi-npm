import { Match, Summoner } from '../models';
import RiotQuery from './RiotQuery';

/**
 * this is a separate class so its not exported with the RiotAPIClient.
 * if it was static in the riot api client it could be used before initializing the client,
 * which means it wouldn't have the api key and rate limits set yet.
 */
export default class Functions {
    private static queryTool: RiotQuery;

    constructor(apiKey: string, requests: number, seconds: number) {
        Functions.queryTool = new RiotQuery(requests, seconds, apiKey);
    }

    static summoner = {
        getByName: async (name: string): Promise<Summoner | null> => {
            try {
                const summoner = (await Functions.queryTool.query(
                    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
                )) as Summoner;
                return summoner;
            } catch (error) {
                return null;
            }
        },
        getByAccountId: async (encryptedAccountId: string): Promise<Summoner | null> => {
            try {
                const summoner = (await Functions.queryTool.query(
                    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${encryptedAccountId}`,
                )) as Summoner;
                return summoner;
            } catch (error) {
                return null;
            }
        },
        getByPuuid: async (encryptedPUUID: string): Promise<Summoner | null> => {
            try {
                const summoner = (await Functions.queryTool.query(
                    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encryptedPUUID}`,
                )) as Summoner;
                return summoner;
            } catch (error) {
                return null;
            }
        },
        getBySummonerId: async (encryptedSummonerId: string): Promise<Summoner | null> => {
            try {
                const summoner = (await Functions.queryTool.query(
                    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/${encryptedSummonerId}`,
                )) as Summoner;
                return summoner;
            } catch (error) {
                return null;
            }
        },
    };
    static match = {
        /**
         *
         * @param puuid the puuid of the summoner
         * @param startTime Epoch timestamp in seconds
         * @param endTime
         * @param queue
         * @param type
         * @param start
         * @param count
         * @returns
         */
        getMatchList: async (
            puuid: string,
            startTime?: number,
            endTime?: number,
            queue?: number,
            type?: string,
            start: number = 0,
            count: number = 20,
        ): Promise<string[]> => {
            let url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`;
            if (startTime) {
                url += `&startTime=${startTime}`;
            }
            if (endTime) {
                url += `&endTime=${endTime}`;
            }
            if (queue) {
                url += `&queue=${queue}`;
            }
            if (type) {
                url += `&type=${type}`;
            }
            const matchList = (await Functions.queryTool.query(url)) as string[];
            return matchList;
        },
        getMatch: async (matchId: string): Promise<Match> => {
            const match = (await Functions.queryTool.query(
                `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
            )) as Match;
            return match;
        },
    };
}
