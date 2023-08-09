const favoritesModel = require('../model/favorites.model')

async function create(data) {
    return (await favoritesModel.create(data)).populate("user songs")
}

async function read(filter = {}) {
    return await favoritesModel.find(filter).populate("user songs")
}

async function readOne(filter={}) { 
    const res = await favoritesModel.findOne(filter).populate("user songs")
    return res
}

async function readOneLogin(filter={},proj) { 
    const res = await favoritesModel.findOne(filter,proj).populate("user songs")
    return res
}

async function update() {
    return await favoritesModel.updateOne().populate("user songs")
}

async function updateAndReturn(filter, newData){
    let data = await favoritesModel.findOneAndUpdate(filter,newData,{new:true}).populate("user songs")
    return data
}

async function del(filter = {}) {
    return await favoritesModel.updateOne(filter,{isActive: false})
}

module.exports = {create,read,readOne,readOneLogin,update,updateAndReturn,del}