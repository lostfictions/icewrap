const repl = require('repl');
const { PeerioClient } = require('./index');

let [username, accountKey] = process.argv.slice(2, 4);
console.log(username, accountKey)
if(!username || !accountKey) {
  username = process.env.PEERIO_USERNAME;
  accountKey = process.env.PEERIO_ACCOUNTKEY;
}

if (!username || !accountKey) {
  console.warn(`Missing username or account key. Authentication probably won't succeed.`);
}

const client = new PeerioClient('testclient');
client.login(username, accountKey);

client.waitForAuth().then(() => {
  console.log('Auth ok.');
  const server = repl.start()
  server.context.client = client
  server.context.ice = client.app
});
