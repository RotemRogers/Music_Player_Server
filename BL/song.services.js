const songController = require('../DL/controller/song.controller')

async function saveSong (data) {
    if (!data) throw "missing data"
    let song = await songController.create(data)
    return song
}

async function removeSong(songId){
    if (!songId) throw "missing song Id"
    let song = await songController.del({id:songId})
    if (!song) throw "song not exist"
    return song
}


module.exports = {saveSong,removeSong}