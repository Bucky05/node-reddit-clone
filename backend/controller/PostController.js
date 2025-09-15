// controller/PostController.js
const express = require('express')
const router = express.Router()
const postService = require('../service/PostService')

// Routes
router.get('/', getAllPosts)
router.get('/by-user/:username', getPostByUsername)
router.get('/by-subreddit/:subredditId', getPostsBySubreddit)
router.get('/:postId', getPost) // optional: single post by id
router.post('/', createPost)

async function getAllPosts(req, res, next) {
  try {
    const posts = await postService.getAllPosts()
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

async function getPostsBySubreddit(req, res, next) {
  try {
    const posts = await postService.getPostsBySubreddit(req.params.subredditId)
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

async function getPostByUsername(req, res, next) {
  try {
    const posts = await postService.getPostByUsername(req.params.username)
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

async function getPost(req, res, next) {
  try {
    const post = await postService.getPostById(req.params.postId)
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

async function createPost(req, res, next) {
  try {
    const created = await postService.createPost(req.body)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

module.exports = router
