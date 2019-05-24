const path = require('path')

const { BrowserWindow } = require('electron')

const defaults = {
    show: false,
    webPreferences: {
        nodeIntegration: true
    }
}

module.exports = { open }

async function open (name, url, options = {}) {
    const window = new BrowserWindow( Object.clone(defaults, options) )

    window.setTitle(`${name} ${config.app.name}`)
    window.loadFile( path.join(
        config.app.interface.folder,
        url + config.app.interface.extension
    ))

    return new Promise(function (resolve) {
        window.once('ready-to-show', () => {
            window.webContents.openDevTools()
            window.show()
            return resolve(window)
        })
    })
}