export * from './client'
export * from './models'
export default
    {
        RiotAPIClient: require('./client/RiotAPIClient').default
    }
// TODO:
/**
 * Figure out how to export the default riotapi client
 * Move summoner functions to the riot api client so a user cant do Summoner.getByName
 *  and instead have to make a instace of the client and do client.summoner.getByName
 *  Will have to change tests for summoner and put them in the client tests
 */