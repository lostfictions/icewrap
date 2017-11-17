wraps [icebear](https://github.com/PeerioTechnologies/peerio-icebear) for easier
use: used standalone, it includes a self-contained repl, and when used as a
package consumers don't have to pollute their project with extra dependencies or
compile icebear themselves. the wrapper provides a very basic eventemitter
interface.

i don't recommend looking at `package.json` or `index.js` to find out _how_
exactly it makes things easier for consumers.

note that this package by necessity sets globals when it's imported: `WebSocket`
and `XMLHttpRequest` will be set (and overridden, if they're already in use).
icebear itself overrides the global `Promise` implementation with Bluebird, so
caveat emptor.

you can spin up a repl with `npm start`. either pass a username and account key
on the command like, ie. `npm start "coolguy" "3920 2398..."` or set the
`PEERIO_USERNAME` and `PEERIO_ACCOUNTKEY` environment variables. in the repl,
tab autocomplete works, just like a node repl. the icebear instance will be
available globally as `ice`, and the icewrap client exists as `client`.
