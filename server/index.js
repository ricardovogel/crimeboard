const express = require("express");
const http = require("http");
const logging = require("./logging");

const port = 3000;
const app = express();

const server = http.createServer(app);
app.use(express.static(`client`));

// app.set("view-engine", "ejs");
// app.set('views', __dirname.replace("server", "client/views"));


// app.get("/", function (req, res) {
//     res.sendFile('index.html');
// });

logging.logDebug("server starting");
server.listen(process.env.PORT || 3000);
logging.logDebug("server started");