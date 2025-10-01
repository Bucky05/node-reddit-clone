const {getUserByUsername} = require('../db/queries')
const authService = require('../service/AuthService')
const pool = require('../db/connection')
class userDetailsServiceImpl {
    async loadByUsername(user) {
        try {
            //fetch user using username if not presnt throw error then check userpassword
            const res = await pool.query(getUserByUsername,user.username)
            if(res.length === 0) 
                return "Username doesn't exist"
                
            return true

        }
        catch(err) {
            console.log("Login Failed. ",err)
        }
    }
    
getAuthorities(role) {
    return [ { authority: role } ];
  }
}

module.exports = userDetailsServiceImpl