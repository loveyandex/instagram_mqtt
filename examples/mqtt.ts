import { IgApiClientExt, IgApiClientFbns, withFbns } from '../src';
import { IgApiClient } from 'instagram-private-api';
import { promisify } from 'util';
import { writeFile, readFile, exists } from 'fs';

import { IgApiClientRealtime, withRealtime } from '../src';
import { GraphQLSubscriptions } from '../src/realtime/subscriptions';
import { SkywalkerSubscriptions } from '../src/realtime/subscriptions';

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
const existsAsync = promisify(exists);




const {IG_USERNAME = 'adidasberan', IG_PASSWORD = 'godisgreat19'} = process.env;


(async () => { 


    const ig: IgApiClientRealtime = withRealtime(new IgApiClient(), /* you may pass mixins in here */);


    // this logs the client in
    await loginToInstagram(ig);


    // whenever something gets sent and has no event, this is called
    ig.realtime.on('receive', (topic, messages) => console.log('receive', topic, messages));
    
    // this is called with a wrapper use {message} to only get the "actual" message from the wrapper
    ig.realtime.on('message', logEvent('messageWrapper'));
    
    // a thread is updated, e.g. admins/members added/removed
    ig.realtime.on('threadUpdate', logEvent('threadUpdateWrapper'));
    
    // other direct messages - no messages
    ig.realtime.on('direct', logEvent('direct'));
    
    // whenever something gets sent to /ig_realtime_sub and has no event, this is called
    ig.realtime.on('realtimeSub', logEvent('realtimeSub'));
    
    // whenever the client has a fatal error
    ig.realtime.on('error', console.error);
    
    ig.realtime.on('close', () => console.error('RealtimeClient closed'));
    

})()

/**
 * A wrapper function to log to the console
 * @param name
 * @returns {(data) => void}
 */
function logEvent(name: string) {
    return (data: any) => console.log(name, data);
}


async function loginToInstagram(ig: IgApiClientExt) {
    ig.request.end$.subscribe(() => saveState(ig));
    await ig.account.login(IG_USERNAME, IG_PASSWORD);
}

async function saveState(ig: IgApiClientExt) {
    return writeFileAsync('state.json', await ig.exportState(), { encoding: 'utf8' });
}

async function readState(ig: IgApiClientExt) {
    if (!await existsAsync('state.json'))
        return;
    await ig.importState(await readFileAsync('state.json', {encoding: 'utf8'}));
}
