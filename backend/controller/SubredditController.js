const router = require('express').Router()

router.post('/',createSubreddit)
router.get('/',getAllSubreddit)
const {saveSubredditFunction,getAll} = require('../service/SubredditService')
async function createSubreddit(req,res) {
    const newSubreddit =  await saveSubredditFunction(req.body)
    res.status(201)
    res.send(newSubreddit)
}
async function getAllSubreddit(req,res) {
    const list = await getAll()
    res.send(list)
}

module.exports = router
///use of controller is to get request and pass it on to the service fit for that request. so avoid
//business code in the controller files