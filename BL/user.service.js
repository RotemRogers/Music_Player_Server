const userController = require('../DL/controller/user.controller')
const bcrypt = require('bcrypt')
const saltRounds = Number(process.env.SALT_ROUNDS)
const auth = require('../auth/auth')

async function getUser (email) {
    let user = await userController.readOne({email : email})
    if(!user) throw "user not found"
    return user
}

async function register (data) {
    console.log(data)
    const user = await userController.readOne({email : data.email})
    console.log(user)
    if (user) throw "user already exist"
    data.password = bcrypt.hashSync(data.password,saltRounds)
    console.log(data.password)
    if (String(data.password).length <6) throw "password is too short, must be at least 6 charcters"
    let newUser = await userController.create(data)
    return newUser
}

async function login(data){
    if (!data.email || !data.password) throw "missing data"
let user = await userController.readOneLogin({email:data.email},"+password")
    if (!user) throw "user doesn't exist";
    if (!bcrypt.compareSync(data.password /*from user*/,user.password /*from db*/)) throw "password incorrect"
    user = await userController.updateAndReturn({email:user.email},{lastConnectedDate: new Date()})
    const token = await auth.createToken({user:user._id})
    return {user,token}
}

module.exports = {register,getUser,login}