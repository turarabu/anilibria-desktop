module.exports = { run }

async function run () {
    Object.prototype.clone = ObjectClone
}

function ObjectClone (...objects) {
    var result = [];

    objects.forEach(object => {
        result.push(object)
    })

    return Object.assign(...result)
}