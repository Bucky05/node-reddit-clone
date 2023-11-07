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
    getSubredditByName : `SELECT * FROM subreddit WHERE subreddit_name = ?`
}