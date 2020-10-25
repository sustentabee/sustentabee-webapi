const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv/config");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(routes);

server.listen(process.env.PORT || 3333);
