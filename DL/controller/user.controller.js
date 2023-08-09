const userModel = require('../model/user.model')

async function create(data) {
    return await userModel.create(data)
}

async function read(filter = {}) {
    return await userModel.find(filter)
}

async function readOne(filter={}) { 
    const res = await userModel.findOne(filter)
    return res
}

async function readOneLogin(filter={},proj) { 
    const res = await userModel.findOne(filter,proj)
    return res
}

async function update(filter, newData) {
    return await userModel.updateOne({filter}, {newData})
}

async function updateAndReturn(filter, newData){
    let data = await userModel.findOneAndUpdate(filter,newData,{new:true})
    return data
}

async function del(email) {
    return await userModel.updateOne({email},{isActive: false})
}

module.exports = {create,read,readOne,readOneLogin,update,updateAndReturn,del}