const router = require('express').Router()


const {saveSubredditFunction,getAll} = require('../service/SubredditService')
module.exports =  {
    async createSubreddit(req,res) {
        const newSubreddit =  saveSubredditFunction(req.body)
        res.status(201)
        res.send(newSubreddit)
    },
    async getAllSubreddit(req,res) {
        res.send(getAll())
    }
}

///use of controller is to get request and pass it on to the service fit for that request. so avoid
//business code in the controller files