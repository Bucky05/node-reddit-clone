const express = require('express')
const { body, validationResult } = require('express-validator')
const PostController = require('../controller/PostController')
const router = express.Router()

router.get('/', PostController.getAllPosts)
router.get('/by-user/:username', PostController.getPostByUsername)
router.get('/by-subreddit/:subredditId', PostController.getPostsBySubreddit)
router.get('/:postId', PostController.getPost) // optional: single post by id
router.post('/', PostController.createPost)

module.exports = router