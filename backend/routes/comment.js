const router = require('express').Router()
const commentService = require('../service/CommentService')
const CommentController = require('../controller/CommentController')
router.post('/',CommentController.saveComment)
router.get('/',CommentController.getAllCommentsForPost)
router.get('/by-user',CommentController.getAllCommentsForUser)

module.exports = router