const express = require('express')
const router = new express.Router()
const voteService = require('../service/VoteService')

router.post('/',vote)
async function vote(req,res) {
    const voteRes = await voteService.vote(req.body);
    if(voteRes === true) {
        res.status(201).send({"message" : "Vote Added"}) 
    }
    else {
        res.status(403).send({"text" : `${voteRes}`})
    }
    
    
}

module.exports = router