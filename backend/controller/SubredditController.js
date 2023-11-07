const router = require('express').Router()

router.post('/',createSubreddit)
router.get('/',getAllSubreddit)
router.get('/:subredditId',getSingleSubreddit)
const {saveSubredditFunction,getAll,getSubreddit} = require('../service/SubredditService')
async function createSubreddit(req,res) {
    const newSubreddit =  await saveSubredditFunction(req.body)
    res.status(201)
    res.send(newSubreddit)
}
async function getAllSubreddit(req,res) {
    const list = await getAll()
    res.send(list)
}
async function getSingleSubreddit(req,res) {
    const subreddit = await getSubreddit(req.params.subredditId)
    res.send(subreddit)
}

module.exports = router
///use of controller is to get request and pass it on to the service fit for that request. so avoid
//business code in the controller files