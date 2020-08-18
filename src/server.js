const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(routes);

app.listen(process.env.PORT || 3333)