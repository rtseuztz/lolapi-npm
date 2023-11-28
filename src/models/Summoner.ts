import RiotAPIClient from '../client/RiotAPIClient';

export class Summoner {
    /**
     * Encrypted account ID.
     */
    accountId: string;
    /**
     * ID of the summoner icon associated with the summoner
     */
    profileIconId: number;
    /**
     * Date summoner was last modified specified as epoch milliseconds.
     * The following events will update this timestamp: summoner name change, summoner level change, or profile icon change.
     */
    revisionDate: number;
    /**
     *  Summoner name.
     */
    name: string;
    /**
     * Encrypted summoner ID. Max length 63 characters.
     */
    id: string;
    /**
     * Encrypted PUUID. Exact length of 78 characters.
     */
    puuid: string;
    /**
     * Summoner level associated with the summoner.
     */
    summonerLevel: number;
    /**
     * Date summoner was last modified specified as epoch milliseconds.
     */
    lmod: number;

    constructor(
        accountId: string,
        profileIconId: number,
        revisionDate: number,
        name: string,
        id: string,
        puuid: string,
        summonerLevel: number,
        lmod?: number,
    ) {
        this.accountId = accountId;
        this.profileIconId = profileIconId;
        this.revisionDate = revisionDate;
        this.name = name;
        this.id = id;
        this.puuid = puuid;
        this.summonerLevel = summonerLevel;
        this.lmod = lmod || 0;
    }
}
export default Summoner;
