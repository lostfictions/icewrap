const { PeerioClient } = require('./index');

const client = new PeerioClient('testclient');
client.login(
  process.env.PEERIO_USERNAME || 'dummy',
  process.env.PEERIO_ACCOUNTKEY || 'dummy'
);

client.waitForAuth().then(() => {
  console.log('Auth ok. Exiting in 5 seconds...');
  setTimeout(() => { console.log('Done.') }, 5000);
});
