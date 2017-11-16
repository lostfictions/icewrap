wraps icebear so consumers don't have to pollute their project with extra
dependencies or compile it themselves. also provides a very basic eventemitter
interface.

note that this package sets globals when it's imported: `WebSocket` and
`XMLHttpRequest` will be set (and overridden, if they're already in use).
icebear itself overrides the global `Promise` implementation with Bluebird, so
caveat emptor.
