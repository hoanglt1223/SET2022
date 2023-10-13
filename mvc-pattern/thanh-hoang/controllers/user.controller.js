const jwt = require("jsonwebtoken");
const { insertUser, verifyUser, handleAuthResponse } = require("./helpers");
const { handleError } = require("../helpers");

function signUp(request, response) {
  const user = request.body;
  const { username, password } = user;

  const hashedPassword = password ? hashPassword(password) : undefined;
  const newUser = {
    username: username,
    password: hashedPassword,
  };

  // localStrorage.getItem('users')
  // const users = JSON.parse(localStorage.getItem('users')) || []
  // const foundUser = users.find(user => user.username === newUser.username)
  // if (foundUser) {
  //     response.statusCode = 400
  //     response.end('Username is already taken.')
  //     return
  // }
  // users.push(newUser)
  // localStorage.setItem('users', JSON.stringify(users))
  // response.end('Sign up successfully.')

  userRepository
    .createOne(newUser)
    .then((insertedUser) => {
      console.log("Log: signUp -> insertedUser", insertedUser);
      response.statusCode = 201;
      response.setHeader("Content-Type", "application/json");
      response.end("Sign up successfully.", insertedUser);
    })
    .catch((err) => {
      handleError(err, "controllers/index.js", "signUp");
      handleAuthResponse(response, false);
    });
}

// *INFO: Explain signUp function
// 1. We get the user data from request.body
// 2. We hash the password
// 3. We create a new user object with username and hashed password
// 4. We insert the new user to the database
// 5. If there is no error, we log the inserted user and return a success response
// 6. If there is an error, we log the error and return a fail response

function signIn(request, response) {
  const user = request.body;
  response.setHeader("Content-Type", "application/json");
  verifyUser(user)
    .then((foundUser) => {
      if (!foundUser) {
        throw new Error("User not found");
      }
      const token = jwt.sign({ userId: foundUser.id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      });
      const data = {
        token,
      };
      response.end(JSON.stringify(data));
    })
    .catch((err) => {
      handleError(err, "controllers/index.js", "signIn");
      response.statusCode = 404;
      response.end("Username or password is not correct.");
    });
}

module.exports = {
  signUp,
  signIn,
};
