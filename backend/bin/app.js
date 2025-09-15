require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const authRouter = require('../routes/auth')
const postRouter = require('../routes/post')
const subredditRouter = require('../routes/subreddit')
// security middlewares
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(rateLimit({ windowMs: 60_000, max: 100 }))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/subreddit', subredditRouter)

// error handler
const errorHandler = require('../middleware/errorHandler')
app.use(errorHandler)

const { port } = require('../config/config')
app.listen(port, () => console.log(`Server running on ${port}`))
