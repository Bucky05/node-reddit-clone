module.exports = {
    createUser : `INSERT INTO user SET ?`,
    getUserFromToken : `SELECT email FROM verification_token WHERE token = ?`,
    addToken : `INSERT INTO verification_token (email,token) VALUES (?,?)`,
    enableUser : `UPDATE user SET enabled = 1 WHERE email = ?`,
    deleteToken : `DELETE FROM verification_token where email = ?`,
    getUserByUsername : 'Select * from user where username = ?',
    saveSubreddit : `INSERT INTO subreddit SET ?`,
    getAllSubreddit : `SELECT * FROM subreddit`,
    getSubreddit : `SELECT * FROM subreddit WHERE subreddit_id = ?`,
    getSubredditByName : `SELECT * FROM subreddit WHERE subreddit_name = ?`,
    getPostById : `SELECT * FROM posts WHERE post_id = ?`,
    getAllPostsQuery : `SELECT * FROM posts`,
    savePost : `INSERT INTO posts SET ?`,
    getPostById : `SELECT * FROM posts WHERE post_id = ?`,
    getPostsByUsername : `SELECT * FROM posts WHERE username = ?`,
    //change subreddit name to subreddit id 
    getPostsBySubreddit : `SELECT * FROM posts WHERE subreddit_id = ?`,
    getEmailFromPost :`SELECT user.email, user.username , subquery.url, subquery.post_name FROM user INNER JOIN (SELECT * FROM posts WHERE post_id = ? ) AS subquery ON user.username = subquery.username;`,
    saveComment : `INSERT INTO comment SET ?`,
    getAllCommentsQuery : `SELECT * FROM comment where post_id = ?`,
    getCommentsByUser :`SELECT * FROM comment where username = ?`
}