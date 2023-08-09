require("dotenv").config();

require('./DL/db').connect()

const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use('/user', require('./Router/user.router'))
app.use('/song', require('./Router/song.router'))
app.use('/favorites', require('./Router/favorites.router'))
app.use('/playlist', require('./Router/playlist.router'))

const port = 1001|| process.env.PORT

app.listen(port,()=>{
    console.log("📢 server is up 📢");
})