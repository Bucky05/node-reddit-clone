const jwt = require('jsonwebtoken')
const config = require('./config')
const configureCreds = require('./securityConfig')


// module.exports = (jwtSecret) => {
//     const jwtVerifier = new JwtVerification(jwtSecret);
  
//     return (req, res, next) => {
//       const token = req.header('Authorization');
//       if (jwtVerifier.verifyToken(token)) {
//         next();
//       } else {
//         res.status(401).send('Unauthorized');
//       }
//     };
//   };
module.exports =   async function doFilterInternal(req,res,next) {
    try {
        const token = getJwtFromRequest(req)
        if(jwt.verify(token,config.secret)) {
            const user = jwt.decode(token,config.secret)
            if(await configureCreds(user)) {
                                next()
            }
            else {
                res.send({"message":"Authentication failed"})
            }

        }
    }
    catch(err) {
        res.send("Authentication Failed ")
        console.log("Authorization invalid ",err)
    }
        
    }

function getJwtFromRequest(req) {
        if(req.headers["authorization"])
            return req.headers["authorization"].substring(7)
        return ''
    }
