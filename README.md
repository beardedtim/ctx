# ctx
A way to keep shared context for the current execution context

## API

> Note: `@beardedtim/ctx` is designed to be a singleton in your application.
> As such, you should only ever call `createCtx` _once_ per context you wish
> to have in your application. Creating more than one will have unforeseen
> circumstances.

```js
// ctx.js
const createCtx = require('@beardedtim/ctx')

module.exports = createCtx({
    default: 'state'
})

// server.js
const ctx = require('./ctx')

app.use(async (req, res, next) => {
    ctx.set('foo', 'bar')
    await next()
}).use((req, res) => {
    res.end(ctx.get('foo')) // sends 'bar'
})
```