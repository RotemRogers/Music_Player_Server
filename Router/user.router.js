const express = require('express')
const router = express.Router();

const userServices = require('../BL/user.service');

router.post("/register", async (req,res) => {
    try {
        const results = await userServices.register(req.body)
        res.send(results)
    }
    catch (err){
        res.status(400).send(err)
    }
})

router.get("/:email", async (req,res) => {
    try {
        const results = await userServices.getUser(req.params.email)
        res.send(results)
    }
    catch (err){
        res.status(400).send(err)
    }
})

router.post("/login", async (req,res) => {
    try {
        const results = await userServices.login(req.body)
        res.send(results)
    }
    catch (err){
        res.status(400).send(err.message)
    }
})


module.exports = router