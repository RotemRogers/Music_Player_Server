const jwt = require("jsonwebtoken");

function createToken(data){
    return jwt.sign(data,process.env.SECRET,{expiresIn : "2d"})
}

function verify(req,res,next){
    const token = req.headers.authorization
    const data = jwt.verify(token.replace("Bearer ",""),process.env.SECRET)
    if(!data) throw "missing data"
    req.id = data.user
    next()
}

module.exports = {createToken,verify}