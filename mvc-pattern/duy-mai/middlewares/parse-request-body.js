const { handleError } = require('../helpers')

function parseRequestBody(request, response) {
  try {
    return new Promise((resolve, reject) => {
      const chunks = []
      request
        .on('data', (chunk) => {
          chunks.push(chunk)
        })
        .on('end', () => {
          const data = JSON.parse(chunks.length > 0 ? chunks : '{}')
          request.body = data
          resolve()
        })
    })
  } catch (err) {
    if (!err.message) {
      handleError(err, 'middlewares/parse-request-body.js', 'parseRequestBody')
    }
    const message = err.message || 'Invalid request!'
    res.statusCode = 401
    res.end(message)
  }
}

module.exports = parseRequestBody