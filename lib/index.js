const { AsyncLocalStorage } = require('async_hooks')
const R = require('ramda')

/**
 * Creates a new context. The return value should be treated
 * as a singleton
 * 
 * @param {Object} startingState The state to have as the root context that all other context extend
 */
module.exports = (startingState = {}) => {
    const ctx = new AsyncLocalStorage()

    /**
     * Gets a value from the current context 
     * @param {string} path The dot.separated.path to the key in context you want to read
     */
    const get = path => R.path(R.split('.', path), ctx.getStore())

    /**
     * Sets a given key to the given value in context for the current execution
     * 
     * @param {string} path The dot.separated.path to the key in context you want to set
     * @param {*} value The value to set that key to
     */
    const set = (path, value) => ctx.enterWith(R.assocPath(R.split('.', path), value, ctx.getStore()))

    /**
     * Reads the current context as a whole and returns it
     */
    const read = () => Object.assign({}, ctx.getStore())

    ctx.enterWith(startingState)

    return {
        get,
        set,
        read
    }
}