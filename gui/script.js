var { ipcRenderer } = require('electron')
var ipc = { on, sync, async, channel };

function sync (channel, ...data) {
    return ipcRenderer.sendSync(channel, ...data);
}

function on (event, callback) {
    ipcRenderer.on(event, function (e, ...message) {
        callback(...message);
    });
}

function async (channel, ...data) {
    return new Promise(function (resolve) {
        ipcRenderer.send(channel, ...data)
        ipcRenderer.once(`${channel}-response`, function (e, ...response) {
            resolve(...response)
        });
    });
}

function channel (name, ...data) {
    var listeners = [];

    ipcRenderer.send(`${name}-channel`, ...data);
    ipcRenderer.on(`${name}-channel-response`, function (e, ...response) {
        listeners.forEach(async listener => listener(...response));
    });

    return {
        listen: callback => listeners.push(callback),
        mute: id => listeners.splice(id-1, 1)
    };
}

async function main () {
    var answer = await ipc.async('test', 123, 456, 'qwe')
    console.log(answer)
}