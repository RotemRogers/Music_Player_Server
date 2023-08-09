const playlistController = require('../DL/controller/playlist.controller')
const songController = require('../DL/controller/song.controller')

async function addToPlaylist (userId,name,data) {
    if(!name) throw "Name require"
    let songExists = await songController.readOne({id:data.id})
    if(!songExists){
        songExists=await songController.create(data)
    }
    let playlist = await playlistController.readOne({name:name,user:userId})
        if(!playlist){
            playlist = await playlistController.create({user : userId,name:name,songs : [songExists._id]})
            console.log("created in new playlist")
        }
        if(playlist){
            playlist.songs.forEach((song)=>{
                if(song.id == songExists.id) throw "song exist"
            })
            playlist.songs.push(songExists._id)
            playlist = await playlistController.updateAndReturn({name:name,user:userId},{songs : playlist.songs })
            console.log("added to existing playlist")
        }
    if (!data) throw "missing data"
    return playlist
}

async function getPlaylist (userId) {
    if(!userId) throw "missing userId"
    let playlist = await playlistController.read({user:userId,isActive : true})
    if(!playlist) throw "data not recieved"
    return playlist
}

async function getPlaylistSongs(userId,name) {
    if(!userId) throw "missing user ID"
    if(!name) throw "missing playlist name"
    let playlist = await playlistController.read({user:userId,name:name})
    if(!playlist) throw "playlist not found"
    return playlist
}

async function DelPlaylist(userId,name) {
    if(!userId) throw "missing user ID"
    if(!name) throw "missing playlist name"
    let deletePlaylist = await playlistController.del({user:userId,name:name})
    if(!deletePlaylist) throw "playlist not found"
    return deletePlaylist
}


module.exports = {addToPlaylist,getPlaylist,getPlaylistSongs,DelPlaylist}