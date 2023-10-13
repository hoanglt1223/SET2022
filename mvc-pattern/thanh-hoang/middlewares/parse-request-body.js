const { handleError } = require('../helpers')

function parseRequestBody(request) {
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
          resolve(data)
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

//*INFO: Explain code above
// 1. Create a function parseRequestBody
// 2. Use try catch to handle error
// 3. Create a promise to get request body
// 4. Create a variable chunks to store chunks of request body


// Why request body is separated into chunks?
// Because request body can be very large, so it is separated into chunks to avoid memory overflow.
