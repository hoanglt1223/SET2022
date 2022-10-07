const jwt = require('jsonwebtoken');
const { userRepository } = require('../repositories')
const { handleError } = require('../helpers')

function authenticate(req, res) {
  try {
    if (!req.headers.authorization) {
      throw new Error('Invalid token.')
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const { userId } = decodedToken;

    return userRepository.findById(userId).then(foundUser => {
      if (!foundUser) {
        throw new Error('Invalid token.')
      }
    })
  } catch (err) {
    if (!err.message) {
      handleError(err, 'middlewares/authentication.js', 'authenticate')
    }
    const message = err.message || 'Invalid request!'
    res.statusCode = 401
    res.end(message)
  }
}

module.exports = authenticate