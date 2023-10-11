const http = require('http');
const router = require('./router')

const port = 8080

const server = http.createServer((request, response) => {
    const controller = router.route(request)
    controller(request, response)
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

//*INFO: Explain code above
// 1. Create a server with http.createServer() method
// 2. Use router.route() to get controller
// 3. Use controller to handle request and response
// 4. Listen to port 8080
// 5. Log a message to console to confirm server is running
// 6. Run the code and open http://localhost:8080/ in browser to see the result