const child_process = require('child_process');
const { app } = require('electron')
const fs = require('fs')
console.log('update inited')

ipc.async('test', async function (...data) {
    child_process.exec('node updater')
    app.exit();

    
    // fs.unlinkSync( app.getAppPath() )
    return 123;
})