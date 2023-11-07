const router = require('express').Router()
const postService = require('../service/PostService')

router.get('/by-user/:username',getPostByUsername)
router.get('/by-subreddit/:subredditId')
router.get('/',getAllPosts)
router.get('/:postId',getPost)
router.post('/',createPost)

async function createPost(req,res) {
    postService.save(req.body)
    res.sendStatus(201)
}
async function getPost(req,res) {
    res.send(postService.getPost(req.boy.postId)) 
}
async function getAllPosts(req,res) {
    res.send(postService.getAllPosts());
}
async function getPostsBySubreddit(req,res) {
    res.send(postService.getPostsBySubreddit(req.params.subredditId))
}
async function getPostByUsername(req,res) {
    res.send(postService.getPostByUsername(req.params.username))
}

module.exports = router