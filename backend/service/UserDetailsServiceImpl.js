const {getUserByUsername} = require('../db/queries')
const pool = require('../db/connection')
class userDetailsServiceImpl {
    async loadByUsername(user) {
        try {
            //fetch user using username if not presnt throw error then check userpassword
            const res = await pool.query(getUserByUsername,user.username)
            if(res.length === 0) 
                throw "Username doesn't exist"
            if(!user.password || res[0].password === user.password)
                return true
            throw "Password Invalid"

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