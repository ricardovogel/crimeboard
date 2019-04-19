const express = require("express");
const http = require("http");
const logging = require("./logging");

const port = 3000;
const app = express();

const server = http.createServer(app);
app.use(express.static(`src/client`));

logging.logDebug("server starting");
server.listen(process.env.PORT || 3000);
logging.logDebug("server started");