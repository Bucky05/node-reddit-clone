const {getPost} = require('../service/PostService')
const pool = require('../db/connection')
const { v4: uuidv4 } = require('uuid')
const authService = require('./AuthService')
const {saveComment, getEmailFromPost,getAllCommentsQuery,updateCommentid, getPostById, getUserByUsername,getCommentsByUser} = require('../db/queries')
const MailService = require('./MailService')
const mailService =  new MailService()
const NotificationEmail = require('../model/NotificationEmail')
const time = require('./time')

module.exports = {
    async  save(comment) {
        try {
            const mysqlFormattedDateTime = time.currentTime()
            const post = await getPost(comment.postId)
            if(post.length === 0) {
                throw "Post doesn't exist"
            }
            comment.post_id = comment.postId
            delete comment.postId
            comment.comment_id = uuidv4().toString()
            comment.created_date = mysqlFormattedDateTime
            await pool.query(saveComment,comment)
            await pool.query(updateCommentid,[post.comment_count+1,comment.post_id])
            const user = await pool.query(getEmailFromPost,comment.post_id)
            mailService.sendMail(new NotificationEmail(user[0].email, comment.username +" Commented on your post ", comment.username + " posted a comment on your post. "+ user[0].url))
            return comment
        }
        catch (err) {
            const error = 'Unable to save comment '+err
            console.log(error)
            return error
        }
    },
    async getAllComments(postId) {
        try {
        const post = await pool.query(getPostById,postId)
        if(post.length === 0) {
            throw 'Post not found'
        }
        const comments = await pool.query(getAllCommentsQuery,postId)
        return comments;
        }
        catch( err) {
            const error = 'Unable to fetch comments '+err
            console.log(error)
            return error
        }
    },
    async getAllCommentsForUser (username) {
        try {
        const user = await pool.query(getUserByUsername,username)
        if(user.length === 0 ){
            throw 'user not found'
        }
        const comments = await pool.query(getCommentsByUser,username)
        return comments
    }
    catch(err) {
        const error = 'Unable to fetch comments '+err
        console.log(err)
        return error
    }
    }

}