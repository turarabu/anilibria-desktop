const path = require('path')

module.exports = {
    app: {
        name: 'AniLibria TV',
        version: '0.2.0',
        build: 'stable',
        repo: 'turarabu/anilibria-desktop',
        // repo: 'anilibria/electron',
        folder: __dirname,
        interface: {
            folder: path.join(__dirname, 'gui'),
            extension: '.html'
        }
    }
}