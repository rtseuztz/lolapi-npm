import { Match } from '../models';
import Summoner from '../models/Summoner';
import Functions from '../tools/Functions';
import RiotQuery from '../tools/RiotQuery';

export class RiotAPIClient {
    private functions: Functions;
    constructor(apiKey: string, requests: number, seconds: number) {
        this.functions = new Functions(apiKey, requests, seconds);
    }
    match = Functions.match;
    summoner = Functions.summoner;
}
export default RiotAPIClient;
