const express = require('express')
const router = express.Router() 
const VoteController = require('../controller/VoteController') 
router.post('/',VoteController.vote)

module.exports = router