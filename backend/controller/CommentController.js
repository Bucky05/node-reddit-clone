
const router = require('express').Router()
const commentService = require('../service/CommentService')

router.post('/',saveComment)
router.get('/',getAllCommentsForPost)
router.get('/by-user',getAllCommentsForUser)
async function saveComment(req,res) {
    const comment = await commentService.save(req.body)
    res.status(201).send(comment)
}
async function getAllCommentsForPost(req,res) {
    const comments = await commentService.getAllComments(req.query.postId)
    res.status(200).send([...comments])
}
async function getAllCommentsForUser(req,res) {
    const comments = await commentService.getAllCommentsForUser(req.query.username)
    res.status(200).send(comments)
}
module.exports = router