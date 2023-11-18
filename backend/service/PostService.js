const pool = require('../db/connection')
const { v4: uuidv4 } = require('uuid');
const {getPostById, getAllPostsQuery} = require('../db/queries')
const {getSubredditByName,savePost,getPostsByUsername, getPostsBySubreddit} = require('../db/queries')
const authService = require('./AuthService')
const time = require('./time')
module.exports = {
save: async (postRequest ) => {
    try {
        const subreddit = await pool.query(getSubredditByName,postRequest.subreddit_name)
        if(subreddit.length == 0) {
            throw 'Subreddit not found'
        }
        //getting current time in india timezone
        
        
        const mysqlFormattedDateTime = time.currentTime()

        postRequest["post_id"] = uuidv4().toString()
        postRequest["username"] = authService.getCurrentUser()
        postRequest["subreddit_id"] = subreddit[0]["subreddit_id"]
        postRequest["created_date"] = mysqlFormattedDateTime;
        delete postRequest["subreddit_name"]
        await pool.query(savePost,postRequest)
        return postRequest
    }
    catch (err) {
        console.log('Unable to save post', err)
    }

},
getPost : async (postId) => {
    try{
    const post = await pool.query(getPostById,postId)
    if(post.length == 0)
        throw ''
    post[0]["duration"] = time.calculateTimeAgo(post[0].created_date)
    delete post[0]["created_date"]
    return post
    }
    catch(err) {
        console.log('Post not found ', err)
    }
},
getAllPosts : async () => {
    try {
        const posts = await pool.query(getAllPostsQuery)
        posts.map((post) => {
            post["duration"] = time.calculateTimeAgo(post.created_date)
        })
        return posts
    }
    catch (err) {
        const error = "Unable to fetch posts "+err
        console.log(error)
        return error 

    }
},
getPostByUsername : async (username) => {
    try {
        const posts = await pool.query(getPostsByUsername,username)
        posts.map((post) => {
            post["duration"] = time.calculateTimeAgo(post.created_date)
        })
        return posts
    }
    catch (err) {
        const error = "Unable to fetch posts "+err
        console.log(error)
        return error 
    }
},
getPostBySubreddit : async (subreddit) => {
    try {
        const subreddit = await pool.query(getSubredditByName)
        const post = await pool.query(getPostsBySubreddit, subreddit["subreddit_id"])
        post.map((posts) => {
            posts["duration"] = time.calculateTimeAgo(posts.created_date)
        })
        return post
    }
    catch (err) {
        const error = 'Unable to fetch posts '+err
        console.log(error)
        return EvalError
    }
}
}
