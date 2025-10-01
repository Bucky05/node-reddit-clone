// controller/PostController.js
const express = require('express')
const router = express.Router()
const postService = require('../service/PostService')


module.exports = {

  getAllPosts : async (req, res, next) => {
    try {
      const posts = await postService.getAllPosts()
      res.status(200).json(posts)
    } catch (err) {
      next(err)
    }
  },

  getPostsBySubreddit : async(req, res, next) => {
    try {
      const posts = await postService.getPostsBySubreddit(req.params.subredditId)
      res.status(200).json(posts)
    } catch (err) {
      next(err)
    }
  },

  getPostByUsername : async (req, res, next) =>{
    try {
      const posts = await postService.getPostByUsername(req.params.username)
      res.status(200).json(posts)
    } catch (err) {
      next(err)
    }
  },

  getPost : async (req, res, next) => {
    try {
      const post = await postService.getPost(req.params.postId)
      if (!post) return res.status(404).json({ message: 'Post not found' })
      res.status(200).json(post)
    } catch (err) {
      next(err)
    }
  },

  createPost : async (req, res, next) => {
    try {
      const created = await postService.createPost({...req.body,username:req.username})
      res.status(201).json(created)
    } catch (err) {
      next(err)
    }
  }
}