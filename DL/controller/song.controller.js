const songModel = require('../model/song.model')

async function create(data) {
    return await songModel.create(data)
}

async function read(filter = {}) {
    return await songModel.find(filter)
}

async function readOne(filter={}) { 
    const res = await songModel.findOne(filter)
    return res
}

async function readOneLogin(filter={},proj) { 
    const res = await songModel.findOne(filter,proj)
    return res
}

async function update() {
    return await songModel.updateOne()
}

async function updateAndReturn(filter, newData){
    let data = await songModel.findOneAndUpdate(filter,newData,{new:true})
    return data
}

async function del(filter = {}) {
    return await songModel.updateOne(filter,{isActive: false})
}

module.exports = {create,read,readOne,readOneLogin,update,updateAndReturn,del}