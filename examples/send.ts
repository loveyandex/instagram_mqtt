import { IgApiClient } from 'instagram-private-api';

const IG_USERNAME = 'ehsin.orig'/**id 30299824247  */;
const IG_PASSWORD = 'godisgreat18';


(async () => {
  // this logs the client in
  const ig = new IgApiClient();
  await loginToInstagram(ig);

  // get the first thread
  const directInbox = await ig.feed.directInbox();
  console.log(JSON.stringify(directInbox));


  // get the first thread
  const [thread] = await ig.feed.directInbox().records();

  console.log(await thread.broadcastText('god is great not you'));
  console.log()


})()



async function loginToInstagram(ig: IgApiClient) {

  ig.state.generateDevice(IG_USERNAME);

  await ig.account.login(IG_USERNAME, IG_PASSWORD);
  console.log('usereid ', await ig.user.getIdByUsername(IG_USERNAME))

}
