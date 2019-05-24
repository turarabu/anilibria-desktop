const lib = require('./lib')

global.config = require('./config')

global.app = require('./core/app')
global.storage = require('./core/storage')
global.window = require('./core/window')

main()

async function main () {
    await lib.run()
    await storage.run()

    await app.init()
    await app.upgrade()
    app.run()
}