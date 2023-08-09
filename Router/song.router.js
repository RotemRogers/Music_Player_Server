const express = require('express')
const router = express.Router();

const songServices = require('../BL/song.services');
const favoritesServices = require('../BL/favorites.services');
const { verify } = require('../auth/auth');

router.post("/savesong", async (req,res) => {
    try {
        const results = await songServices.saveSong(req.body)
        res.send(results)
    }
    catch (err){
        res.status(400).send(err)
    }
})

router.put("/removefromfavorites",verify, async (req,res) => {
    try {
        const results = await songServices.removeSong(req.body)
        res.send(results)
    }
    catch (err){
        res.status(400).send(err)
    }
})

router.post("/addtofavorites",verify,async (req,res)=>{
    try{
        const results = await favoritesServices.addToFavorites(req.id,req.body)
        res.send(results)
    }
    catch (err){
        res.status(403).send(err)
    }
})

module.exports = router
