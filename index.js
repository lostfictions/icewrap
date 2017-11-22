const os = require('os')
const EventEmitter = require('events')

const FileStream = require("../peerio-icebear/dist/models/files/node-file-stream");
const StorageEngine = require("../peerio-icebear/dist/models/storage/node-json-storage");
const { asPromise } = require("../peerio-icebear/dist/helpers/prombservable");

const { when, autorun } = require('mobx')

global.WebSocket = require('websocket').w3cwebsocket
global.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest

class PeerioClient extends EventEmitter {
  constructor(botName, socketServerUrl = 'wss://hocuspocus.peerio.com') {
    super()
    this.app = require('peerio-icebear/dist')

    this.login = (username, accountKey) => {
      this.app.socket.start()
      return this.waitForConnection().then(() => {
        this.emit('connected')
        this.user = new this.app.User()
        this.app.User.current = this.user
        this.user.username = username
        this.user.passphrase = accountKey
        return this.user.login()
      })
    }

    this.waitForConnection = () => asPromise(this.app.socket, 'connected', true)
    this.waitForAuth = () => asPromise(this.app.socket, 'authenticated', true)

    this.getContactWithName = (name) => {
      return new Promise((resolve) => {
        const receiver = new this.app.Contact(name)
        when(() => !receiver.loading, () => resolve(receiver))
      })
    }

    const c = this.app.config
    c.appVersion = '2.37.1'
    c.clientVersion = '2.9.0'
    c.platform = 'electron'
    c.arch = os.arch()
    c.os = os.type()
    c.FileStream = FileStream
    c.StorageEngine = StorageEngine
    c.StorageEngine.storageFolder = os.tmpdir()
    c.socketServerUrl = socketServerUrl

    this.waitForAuth().then(() => {
      this.emit('authenticated')
      setTimeout(() => {
        this.user.firstName = botName
        this.user.lastName = '(bot)'
        this.user.saveProfile().then(() => {
          console.log(`username set to "${this.user.firstName} ${this.user.lastName}"`)
        })
      }, 5000)
    })

    this.app.chatStore.events.on('messagesReceived', (data) => {
      // data is:
      // interface MessagesReceivedData {
      //   freshBatchMentionCount: number
      //   lastMessageText: string
      //   unreadCount: number
      //   chat: Chat
      // }
      const message = data.chat.messages[data.chat.messages.length - 1]
      this.emit('message', { message, chat: data.chat })
    })

    // accept any invites we receive
    autorun(() => {
      const inviteStore = this.app.chatInviteStore
      if (inviteStore && inviteStore.received.length > 0) {
        // shallow clone the array since it may be mutated on accept
        inviteStore.received.slice()
          .forEach((invite) => { inviteStore.acceptInvite(invite.kegDbId) })
      }
    })
  }
}

module.exports = { PeerioClient }
