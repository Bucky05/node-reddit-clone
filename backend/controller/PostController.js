const router = require('express').Router()
const { getPostById } = require('../db/queries')
const postService = require('../service/PostService')

router.get('/by-user/:username',getPostByUsername)
router.get('/by-subreddit/:subredditId')
router.get('/',(req,res) => {
    if(req.query.postId) 
        getPost(req,res)
    else   getAllPosts(req,res)
})
router.get('/',getAllPosts)

router.post('/',createPost)

async function createPost(req,res) {
    const post = await postService.save(req.body)
    res.send(post)
}
async function getPost(req,res) {
    const post = await postService.getPost(req.query.postId)
    res.status(200).send({post})
}
async function getAllPosts(req,res) {
    const posts= await postService.getAllPosts();
    res.status(200).send([...posts]) 
}
async function getPostsBySubreddit(req,res) {
    const post = await postService.getPostsBySubreddit(req.params.subredditId)
    res.status(200).send({post})
}
async function getPostByUsername(req,res) {
    const post = await postService.getPostByUsername(req.params.username)
    res.status(200).send({post})
}

module.exports = router