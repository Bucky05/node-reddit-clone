const router = require('express').Router()
const SubredditController = require('../controller/SubredditController')

router.post('/',SubredditController.createSubreddit)
router.get('/',SubredditController.getAllSubreddit)
router.get('/:subredditId',SubredditController.getSingleSubreddit)

module.exports = router