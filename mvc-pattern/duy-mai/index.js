const http = require("http");
const mongoose = require("mongoose");
const router = require("./router");

const port = 8080;

const server = http.createServer((request, response) => {
  const controller = router.route(request);
  controller(request, response);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

mongoose.connect(
  "mongodb+srv://duymai:c9xWuc0IPoqGL3U5@nodemvc.qk22i.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log('Connect MongoDB database successful')
});
