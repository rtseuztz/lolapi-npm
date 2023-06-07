import RiotQuery from "../tools/RiotQuery";

export default class Summoner {
    readonly accountid: string;
    readonly profileiconid: number;
    readonly revisiondate: number;
    readonly name: string;
    readonly id: string;
    readonly puuid: string;
    readonly summonerlevel: number;
    readonly Query: RiotQuery

    static readonly url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
    constructor(RiotQuery: RiotQuery, accountid: string, profileiconid: number, revisiondate: number, name: string, id: string, puuid: string, summonerlevel: number) {
        this.Query = RiotQuery;
        this.accountid = accountid;
        this.profileiconid = profileiconid;
        this.revisiondate = revisiondate;
        this.name = name;
        this.id = id;
        this.puuid = puuid;
        this.summonerlevel = summonerlevel;
    }
    static get() {
        this.Query.query(this.url)
    }
}