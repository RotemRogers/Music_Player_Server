const mongoose = require('mongoose')
require ('./song.model')
require ('./user.model')

const playlistSchema = new mongoose.Schema({
    name : {
      type : String,
      required : true,
      unique : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Assuming your user model is named 'User'
        required: true
      },
      songs : [{
       
            type: mongoose.Schema.Types.ObjectId,
            ref: 'song', // Assuming your song model is named 'Song'
            required: true
          } 
      ],
    isActive : {
      type : Boolean,
      default : true
    }
      
})

const playlistModel = mongoose.model("playlist",playlistSchema)

module.exports = playlistModel