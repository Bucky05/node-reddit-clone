const jwt = require('jsonwebtoken')
const config = require('../config/config')
const configureCreds = require('../config/securityConfig')


async function authenticateToken(req, res, next) {
  try {
  //Skip auth for GET /posts/* and GET /subreddit/*
    if (
      req.method === 'GET' &&
      (req.url.startsWith('/posts') || req.url.startsWith('/subreddit'))
    ) {
      return next();
    }

    const token = getJwtFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: 'Missing token', description :'Session has expired. Please Login' });
    }

    // Verify token
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      // Optional: check creds (e.g., user still exists in DB)
      const valid = await configureCreds(decoded);
      if (!valid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      req.username = decoded.username; // attach decoded user to request
      next();
    });
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


function getJwtFromRequest(req) {
        if(req.headers["authorization"])
            return req.headers["authorization"].substring(7)
        return ''
}

module.exports = authenticateToken