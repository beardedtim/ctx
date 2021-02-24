const express = require('express')
const createCtx = require('./lib')

const ctx = createCtx({ default: 'state' })

const app = express()

app.use(async (req, res, next) => {
    ctx.set('foo', 'bar')
    await next()
}).use((req, res) => {
    res.end(ctx.get('foo'))
}).listen(5001)