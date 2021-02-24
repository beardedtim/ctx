const test = require('ava')
const createCtx = require('./')

test('sets given context during creation', t => {
    const ctx = createCtx({ foo: 'bar' })

    t.is(ctx.get('foo'), 'bar', 'Foo equals Bar')
})

test('sets given context only within current execution/tick', async t => {
    t.plan(3)

    const ctx = createCtx({ foo: 'bar' })

    t.is(ctx.get('foo'), 'bar', 'Foo equals Bar')

    await new Promise(res => {
        setTimeout(() => {
            ctx.set('foo', 'baz')

            t.is(ctx.get('foo'), 'baz', 'In nested execution context, Foo equals Baz')

            res()
        })
    })

    t.is(ctx.get('foo'), 'bar', 'After nested context, Foo eqals Bar')
})

test('allows getting of deeply nested values', t => {
    const ctx = createCtx({
        foo: {
            bar: {
                baz: {
                    borp: 'yup'
                }
            }
        }
    })

    t.is(ctx.get('foo.bar.baz.borp'), 'yup', 'Nested values can be gotten given a path')
})

test('returns undefined on a path that does not exist', t => {
    const ctx = createCtx({})

    t.is(ctx.get('foo.bar.baz.borp'), undefined, 'You can try to get a value from the state that is not there')
})

test('returns the whole context', t => {
    const startingCtx = {}
    const ctx = createCtx(startingCtx)
    const readCtx = ctx.read()

    t.deepEqual(startingCtx, readCtx, 'You get the ctx you put in when reading')
})