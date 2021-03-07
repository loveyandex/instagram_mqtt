import WebSocket = require('ws')
import {IgApiClientExt, IgApiClientFbns, withFbns, withFbnsAndRealtime} from '../src';
import {IgApiClient} from 'instagram-private-api';
import {promisify} from 'util';
import {writeFile, readFile, exists} from 'fs';

import {IgApiClientRealtime, withRealtime} from '../src';
import {GraphQLSubscriptions} from '../src/realtime/subscriptions';
import {SkywalkerSubscriptions} from '../src/realtime/subscriptions';

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
const existsAsync = promisify(exists);

// const { IG_USERNAME = 'adidasberan'/**id 38081432117 */, IG_PASSWORD = 'godisgreat19' } = process.env;
const {IG_USERNAME = 'ehsin.orig'/**id 30299824247  */, IG_PASSWORD = 'godisgreat18'} = process.env;


const wss = new WebSocket.Server({port: 8080});
wss.on('connection', function connection(ws) {


    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send(JSON.stringify('trade'));


});


(async () => {

    // const ig: IgApiClientFbns = withFbns(new IgApiClient());
    // ig is now IgApiClientMQTT for typescript users
    const ig = withFbnsAndRealtime(new IgApiClient());

    ig.state.generateDevice(IG_USERNAME);
    console.log('god is great after many fails')

    // this will set the auth and the cookies for instagram
    await readState(ig);

    // this logs the client in
    await loginToInstagram(ig);

    // you received a notification
    ig.fbns.on('push', logEvent('push'));

    // the client received auth data
    // the listener has to be added before connecting
    ig.fbns.on('auth', async auth => {
        // logs the auth
        logEvent('auth')(auth);

        //saves the auth
        await saveState(ig);
    });

    // 'error' is emitted whenever the client experiences a fatal error
    ig.fbns.on('error', logEvent('error'));
    // 'warning' is emitted whenever the client errors but the connection isn't affected
    ig.fbns.on('warning', logEvent('warning'));

    // this sends the connect packet to the server and starts the connection
    // the promise will resolve once the client is fully connected (once /push/register/ is received)
    await ig.fbns.connect();


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


    // connect
    // this will resolve once all initial subscriptions have been sent
    await ig.realtime.connect({
        // optional
        graphQlSubs: [
            // these are some subscriptions
            GraphQLSubscriptions.getAppPresenceSubscription(),
            GraphQLSubscriptions.getZeroProvisionSubscription(ig.state.phoneId),
            GraphQLSubscriptions.getDirectStatusSubscription(),
            GraphQLSubscriptions.getDirectTypingSubscription(ig.state.cookieUserId),
            GraphQLSubscriptions.getAsyncAdSubscription(ig.state.cookieUserId),
        ],
        // optional
        skywalkerSubs: [
            SkywalkerSubscriptions.directSub(ig.state.cookieUserId),
            SkywalkerSubscriptions.liveSub(ig.state.cookieUserId),
        ],
        // optional
        // this enables you to get direct messages
        irisData: await ig.feed.directInbox().request(),
        // optional
        // in here you can change connect options
        // available are all properties defined in MQTToTConnectionClientInfo
        connectOverrides: {},
    })
        .catch(e => {
            console.error('e ' + e)
        });

    console.log('after   await ig.realtime.connect({')

})()

async function saveState(ig: IgApiClientExt) {
    return writeFileAsync('state.json', await ig.exportState(), {encoding: 'utf8'});
}

async function readState(ig: IgApiClientExt) {
    if (!await existsAsync('state.json'))
        return;
    await ig.importState(await readFileAsync('state.json', {encoding: 'utf8'}));
}

async function loginToInstagram(ig: IgApiClientExt) {
    ig.request.end$.subscribe(() => saveState(ig));
    await ig.account.login(IG_USERNAME, IG_PASSWORD);
    console.log('usereid ', await ig.user.getIdByUsername(IG_USERNAME))

}

/**
 * A wrapper function to log to the console
 * @param name
 * @returns {(data) => void}
 */
function logEvent(name: string) {
    return (data: any) => console.log('god ', name, JSON.stringify(data));
}