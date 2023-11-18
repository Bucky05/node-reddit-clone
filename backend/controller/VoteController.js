const express = require('express')
const router = new express.Router()
const voteService = require('../service/VoteService')

router.post('/',vote)
async function vote(req,res) {
    voteService.vote(req.body);
    res.status(201).send('Vote Added') 
    
}

module.exports = router