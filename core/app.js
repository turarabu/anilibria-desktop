const { app } = require('electron')
const update = require('./update')
const events = require('./events')

module.exports = { init: main(), upgrade, run }

var ready = false

function main () {
    app.once('ready', function () {
        ready = true
    })

    return init
}

function init () {
    return new Promise(function (resolve) {
        var interval = setInterval(() => {
            if (ready === true) {
                events.init()
                clearInterval(interval)

                return resolve()
            }
        }, 100)
    })
}

function upgrade () {
    return new Promise(async function (resolve, reject) {
        var upgrade = await window.open('Обновление', 'upgrade')
        var check = await update.check()

        if (check === false)
            return resolve()
        else update.install(check)
    })
}

function run () {

}