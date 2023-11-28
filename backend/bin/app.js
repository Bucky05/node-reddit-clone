let { port } = require('../config/config')
const express = require('express')
const app = express()
const authController = require('../controller/AuthController')
const doFilterInternal = require('../config/JwtAuthenticationFilter')
const subreddit = require('../controller/SubredditController')
const post = require('../controller/PostController')
const comment = require('../controller/CommentController')
const vote = require('../controller/VoteController')
const cors = require('cors')
//body will not be handled and not visible if below code is not done, in case of text use express.text()
app.use(express.json())
app.use(cors())
app.use('/api/auth', authController)
app.use('/api',doFilterInternal)

app.use('/api/subreddit',subreddit)
app.use('/api/posts',post)
app.use('/api/comment',comment)
app.use('/api/vote',vote)
// listen on provided port on all network interfaces. this will only listen to http not https
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})


// const express = require('express');
// const jwt = require('jsonwebtoken');
// const jwtSecret = 'your-secret-key';

// const app = express();
// app.use(express.json());

// // Import the JWT verification class
// const JwtVerification = require('./jwtverification');

// // Middleware to verify JWT for all routes containing 'api/'
// app.use('/api/', (req, res, next) => {
//   // Extract the JWT token from the request (assuming it's in the Authorization header)
//   const token = req.header('Authorization');

//   // Create an instance of JwtVerification
//   const jwtVerification = new JwtVerification(jwtSecret, token);

//   // Verify the JWT token
//   if (jwtVerification.verifyToken()) {
//     next(); // Token is valid, continue to the route handler
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// });

// // Define routes with different handlers
// app.post('/api/subreddit', (req, res) => {
//   // Handle POST request to /api/subreddit
//   res.send('Handling POST request to /api/subreddit');
// });

// app.get('/api/auth', (req, res) => {
//   // Handle GET request to /api/auth
//   res.send('Handling GET request to /api/auth');
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
