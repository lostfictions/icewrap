/// <reference types="node" />
declare module 'icewrap' {
  import * as EventEmitter from 'events';

  export interface MessageData {
    message: any;
    chat: any;
  }

  export class PeerioClient extends EventEmitter {
    app: {
      errors: any
      config: any
      socket: any
      crypto: any
      User: any
      PhraseDictionary: any
      TinyDb: any
      contactStore: any
      chatStore: any
      chatInviteStore: any
      fileStore: any
      ghostStore: any
      mailStore: any
      validation: any
      FileStreamAbstract: any
      FileNonceGenerator: any
      util: any
      warnings: any
      warningStates: any
      Clock: any
      fileHelpers: any
      MRUList: any
      clientApp: any
      systemMessages: any
      serverSettings: any
      Contact: any
    };
    user: any;
    constructor(botName: string, socketServerUrl? : string);
    login: (username: string, accountKey: string) => void;
    waitForConnection: () => Promise<void>;
    waitForAuth: () => Promise<void>;
    getContactWithName: (name: string) => Promise<any>;

    addListener(event: string, listener: (...args: any[]) => void): this;
    addListener(event: "message", listener: (data: MessageData) => void): this;
    addListener(event: "connected", listener: () => void): this;
    addListener(event: "authenticated", listener: () => void): this;

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "message", listener: (data: MessageData) => void): this;
    on(event: "connected", listener: () => void): this;
    on(event: "authenticated", listener: () => void): this;

    once(event: string, listener: (...args: any[]) => void): this;
    once(event: "message", listener: (data: MessageData) => void): this;
    once(event: "connected", listener: () => void): this;
    once(event: "authenticated", listener: () => void): this;

    prependListener(event: string, listener: (...args: any[]) => void): this;
    prependListener(event: "message", listener: (data: MessageData) => void): this;
    prependListener(event: "connected", listener: () => void): this;
    prependListener(event: "authenticated", listener: () => void): this;

    prependOnceListener(event: string, listener: (...args: any[]) => void): this;
    prependOnceListener(event: "message", listener: (data: MessageData) => void): this;
    prependOnceListener(event: "connected", listener: () => void): this;
    prependOnceListener(event: "authenticated", listener: () => void): this;
  }
}
