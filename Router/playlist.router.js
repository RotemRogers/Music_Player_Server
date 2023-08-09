const express = require('express');
const router = express.Router();

const playlistServices = require('../BL/playlist.services');
const { verify } = require('../auth/auth');

router.post('/addtoplaylist',verify,async (req,res)=> {
    try {
        const results = await playlistServices.addToPlaylist(req.id,req.body.name,req.body)
        
        res.send(results)
    } catch (error) {
        res.send(error.message).status(401)
    }
})

router.get('/getplaylist',verify,async (req,res)=>{
    try{
        const results = await playlistServices.getPlaylist(req.id)
        res.send(results)
    }
    catch (error) {
        res.send(error.message).status(401)
    }
})

router.get('/showplaylistsongs/:name',verify,async (req,res)=>{
    try{
        const results = await playlistServices.getPlaylistSongs(req.id,req.params.name)
        res.send(results)
    }
    catch (error) {
        res.send(error).status(401)
    }
})

router.put('/deleteplaylist/:name',verify,async (req,res)=>{
    try{
        const results = await playlistServices.DelPlaylist(req.id,req.params.name)
        res.send(results)
    }
    catch (error) {
        res.send(error).status(401)
    }
})

module.exports = router