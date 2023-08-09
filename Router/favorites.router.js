const express = require('express');
const router = express.Router();

const favoritesServices = require('../BL/favorites.services');
const { verify } = require('../auth/auth');

router.get('/getfavorites',verify,async (req,res)=> {
    try {
        const results = await favoritesServices.getFavorites(req.id)
        // console.log(req.id)
        res.send(results)
    } catch (error) {
        res.send(error.message)
    }
})

router.put('/removefavorite',verify,async (req,res)=>{
    try{
        console.log(req.body)
        console.log(req.id)
        const results = await favoritesServices.removeFromFavorites(req.id,req.body.songId)
        res.send(results)
    }
    catch (error) {
        res.send(error.message)
    }
})

module.exports = router