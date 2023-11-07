const PostRequest = require('../dto/PostRequest')
const pool = require('../db/connection')
const {getSubredditByName} = require('../db/queries')
const AuthService = require('./AuthService')
const authService = new AuthService()
module.exports = {
save: async (postRequest ) => {
    try {
        const subreddit = await pool.query(getSubredditByName,postRequest.subredditName)
        if(subreddit.length == 0) {
            throw 'Subreddit not found'
        }
        const currentUser = authService.getCurrentUser()
    }
    catch (err) {
        console.log('Unable to save post', err)
    }

}
}