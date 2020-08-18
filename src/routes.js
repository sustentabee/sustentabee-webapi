const express = require("express");
const auth = require("./app/middlewares/auth");
const UserController = require("./app/controllers/UserController");
const AuthController = require("./app/controllers/AuthController");

const routes = express.Router();

// Users
routes.get("/user", UserController.index);
routes.get("/user/:id", auth, UserController.show);
routes.post("/user", UserController.store);
routes.put("/user/:id", auth, UserController.update);
routes.delete("/user/:id", auth, UserController.destroy);

// Auth
routes.post("/login", AuthController.login);


module.exports = routes;