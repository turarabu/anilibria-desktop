const { ipcMain } = require('electron')
const loads = ['update']

module.exports = { init }

function init () {
    console.log('events init')
    global.ipc = { sync, async, channel }

    loads.forEach(function (load) {
        console.log('loaded ', load)
        require(`./event/${load}`)
    })
}

async function answer (name, event, response) {
    var answer = (response && response.then)
        ? await response : response

    return name === 'sync'
        ? event.returnValue = answer : false;
        // : event.sender.send(name, answer)
}

function sync (channel, callback) {
    ipcMain.on(channel, function (event, ...data) {
        var response = callback(...data)
        answer('sync', event, response)
    })
}

function async (channel, callback) {
    ipcMain.on(channel, function (event, ...data) {
        var response = callback(...data)
        answer(`${channel}-response`, event, response)
    })
}

function channel (name, callback) {
    ipcMain.on(`${name}-channel`, function (event, ...data) {
        var response = callback(...data)
        answer(`${name}-channel-response`, event, response)
    })
}