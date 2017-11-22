const repl = require('repl')
const readline = require('readline')
const { PeerioClient } = require('./index')

let [username, accountKey] = process.argv.slice(2, 4)
if(!username || !accountKey) {
  username = process.env.PEERIO_USERNAME
  accountKey = process.env.PEERIO_ACCOUNTKEY
}

(async () => {
  if(!username || !accountKey) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    username = await new Promise(res => rl.question('Username: ', a => res(a)))
    accountKey = await new Promise(res => rl.question('Account key: ', a => res(a)))
    rl.close()
  }
  console.log(`Logging in as username '${username}' (with account key of length ${accountKey.length})`)

  const client = new PeerioClient('testclient')
  client.on('message', data => console.log(data.message.text))

  try {
    await client.login(username, accountKey)
    await client.waitForAuth()
  }
  catch(e) {
    console.warn(`[ERROR AUTHENTICATING] ${e}`)
    process.exit(1)
  }

  console.log('Auth ok.')

  const server = repl.start()
  server.context.client = client
  server.context.ice = client.app
})()
