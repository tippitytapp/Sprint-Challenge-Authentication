/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const secrets = require('./secrets.js')

function isValid(user){
  return Boolean(
      user.username && 
      user.password && 
      typeof user.password === 'string'
      )
}

const validate = (req, res, next) => {
  const user = req.body;
  if(!user){
      res.status(401).json({ you: 'shall not pass!' });
  } else if(!user.username){
      res.status(400).json({
        message: "Please provide a username for the user"
    })
  } else if (!user.password || typeof user.password !== 'string' || user.password.length < 8){
    res.status(400).json({
        message: "Please provide a valid password for the user"
    })
  } else {
    next();
}
};

function passHash(info){
    const user = info;
    const hash = bcryptjs.hashSync(user.password, 12);
    user.password = hash;
    return user;
}

function createToken(user){
  const payload = {
      sub: user.id,
      name: user.name,
      username: user.username,
      department: user.dept_id
  };
  const options = {
      expiresIn: '24h'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
      jwt.verify(token, secrets.jwtSecret, (err, decToken) => {
          if(err){
              res.status(401).json({
                      message: "Invalid Authorization Received"
              })
          } else {
              req.jwt = decToken;
              next();
          }
      })
  } else {
      res.status(401).json({
          message: "Please provide the correct authorization"
      })
  }
}

module.exports = {
  validate,
  passHash,
  createToken,
  verifyToken,
  isValid
}
