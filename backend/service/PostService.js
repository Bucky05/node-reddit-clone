const pool = require('../db/connection')
const { v4: uuidv4 } = require('uuid');
const {getPostById, getAllPostsQuery} = require('../db/queries')
const {getSubredditByName,savePost,getPostsByUsername, getPostsBySubreddit} = require('../db/queries')
const authService = require('./AuthService')
module.exports = {
save: async (postRequest ) => {
    try {
        const subreddit = await pool.query(getSubredditByName,postRequest.subreddit_name)
        if(subreddit.length == 0) {
            throw 'Subreddit not found'
        }
        const currentUser = authService.getCurrentUser()
        postRequest["post_id"] = uuidv4().toString()
        postRequest["username"] = currentUser
        postRequest["subreddit_id"] = subreddit[0]["subreddit_id"]
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
    return post
    }
    catch(err) {
        console.log('Post not found ', err)
    }
},
getAllPosts : async () => {
    try {
        const posts = await pool.query(getAllPostsQuery)
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
        return post
    }
    catch (err) {
        const error = 'Unable to fetch posts '+err
        console.log(error)
        return EvalError
    }
}
}