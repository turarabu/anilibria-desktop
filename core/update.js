const { app } = require('electron')
const fetch = require('node-fetch')

module.exports = { check, install }

function check () {
    return new Promise(function (resolve, reject) {
        var select = config.app.build === 'stable'
            ? 'releases/latest' : 'releases'

        fetch(`https://api.github.com/${ config.app.repo }/${select}`)
            .then(response => checkStatus(response, resolve, reject))
            .then(response => selectUpdate(response))
            .then(release => checkUpdate(release, resolve, reject))
            .catch(response => updateError(response, resolve, reject))
    })
}

function install () {
    
}

function checkStatus (response, resolve, reject) {
    if (response.status >= 200 && response.status < 300)
        return response.json()
}

function selectUpdate (response) {
    var update = config.app.build === 'stable'
        ? response : response[0]

    return update
}

function checkUpdate (release) {
    if (release.name > app.getVersion())
        resolve('true')
    else resolve(release)
}

function updateError (response) {
    // console.log(response)
    console.log('Error')
}