const url = require('url')
const { handleNotFound, getTasks, addTask, editTask, deleteTask, signUp, signIn, pingWithAuth } = require('./controllers')
const { authenticate, parseRequestBody } = require('./middlewares')
const { handleError } = require('./helpers')

const routes = {
  // endpoint: { method: { controller, middlewares } }
  "/sign-up": { POST: { controller: signUp, middlewares: [parseRequestBody] } },
  "/sign-in": { POST: { controller: signIn, middlewares: [parseRequestBody] } },
  "/add-task": {
    POST: {
      controller: addTask,
      middlewares: [authenticate, parseRequestBody],
    },
  },
  "/update-task": {
    POST: { controller: editTask, middlewares: [parseRequestBody] },
  },
  "/delete-task": {
    POST: { controller: deleteTask, middlewares: [parseRequestBody] },
  },
  "/get-task": {
    POST: { controller: getTasks },
    middlewares: [parseRequestBody],
  },
  "/tasks": {
    POST: { controller: addTask, middlewares: [parseRequestBody] },
    GET: { controller: getTasks, middlewares: [parseRequestBody] },
    PATCH: { controller: editTask, middlewares: [parseRequestBody] },
    DELETE: { controller: deleteTask, middlewares: [parseRequestBody] },
  },
  "/ping-with-auth": {
    GET: {
      controller: pingWithAuth,
      middlewares: [authenticate],
    },
  },
};

function route(req) {
    const parsedUrl = url.parse(req.url, true)
    // POST fb.com/user: Create a new user { pathName: '/user', method: 'POST' }
    if (routes[parsedUrl.pathname] && routes[parsedUrl.pathname][req.method]) {
        const currentRouteData = routes[parsedUrl.pathname][req.method]
        if (currentRouteData.middlewares && currentRouteData.middlewares.length > 0) {
            return function controller(req, res) {
                try {
                    let promise = currentRouteData.middlewares[0](req, res)
                    currentRouteData.middlewares.forEach((middleware, index) => {
                            if (index > 0) {
                                promise.then(() => middleware(req, res))
                            }
                        })
                    // Call controller after all interceptor (middlewares)
                    promise.then(() => currentRouteData.controller(req, res))
                    return promise
                } catch (error) {
                    handleError(error, 'router.js', 'route() -> controller()')
                    res.statusCode = 500
                    res.end()
                }
            }
        }

        return currentRouteData.controller
    }

    return handleNotFound
}

module.exports = { route }

//*INFO: Explain code above
// 1. Create a variable routes to store routes
// 2. Create a function route
// 3. Parse request url
// 4. Check if route is available
// 5. Get current route data from routes include controller 
// and middlewares by checking request method and route path
// 6. Check if current route data has middlewares
// 7. Create a controller function
// 8. Create a promise to run first middleware in the array of middlewares
// 9. Run other middlewares in the array of middlewares
// Middlewares use to authenticate request, parse request body, logging, etc.
// 10. Add controller to promise chaining (last .then) when finish run all middleware
// 11. Return promise


// What is promise?
// Promise is a JavaScript object for asynchronous operation.
// State: pending -> fulfilled or rejected

// Why need promise?
// The code is executed in order from top to bottom.
// But, JavaScript is asynchronous.
// So, JavaScript executes code asynchronously.
// So, we need promise to handle asynchronous operation. 

// 1. Minh Thanh go to school [pending] Block
// 2. Minh Thanh go to bathroom to wash his face at home
// 3. Minh Thanh go to Ha Noi


// promise pending -> fulfilled or 
// How to use promise?
// 1. Create a promise by using new Promise() constructor

