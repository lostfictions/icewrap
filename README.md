wraps icebear so consumers don't have to pollute their project with extra
dependencies or compile it themselves. also provides a very basic eventemitter
interface.

note that this package sets globals when it's imported: `WebSocket` and
`XMLHttpRequest` will be set (and overridden, if they're already in use).
icebear itself overrides the global `Promise` implementation with Bluebird, so
caveat emptor.

you can spin up a repl with `npm start`. either pass a username and account key
on the command like, ie. `npm start "coolguy" "3920 2398..."` or set the
`PEERIO_USERNAME` and `PEERIO_ACCOUNTKEY` environment variables. in the repl,
tab autocomplete works, just like a node repl. the icebear instance will be
available globally as `ice`, and the icewrap client exists as `client`.
