const express = require('express')
const router = express.Router()
const AIController = require('../controller/AIController')

router.post("/enhance",AIController.enhance)

module.exports = router