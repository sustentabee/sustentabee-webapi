const express = require("express");
const auth = require("./app/middlewares/auth");
const UserController = require("./app/controllers/UserController");
const AdressController = require("./app/controllers/AdressController");
const AuthController = require("./app/controllers/AuthController");
const CompanyController = require("./app/controllers/CompanyController");
const EquipmentController = require("./app/controllers/EquipmentController");
const MaintenanceController = require("./app/controllers/MaintenanceController");

const routes = express.Router();

// User
routes.get("/user", UserController.index);
routes.get("/user/:id", auth, UserController.show);
routes.post("/user", UserController.store);
routes.put("/user/:id", auth, UserController.update);
routes.delete("/user/:id", auth, UserController.destroy);

// Auth
routes.post("/login", AuthController.login);

// Company
routes.get("/company", auth, CompanyController.index);
routes.get("/company/:id", auth, CompanyController.show);
routes.post("/company", auth, CompanyController.store);
routes.put("/company/:id", auth, CompanyController.update);
routes.delete("/company/:id", auth, CompanyController.destroy);

// Equipment
routes.get("/equipment", auth, EquipmentController.index);
routes.get("/equipment/:id", auth, EquipmentController.show);
routes.post("/equipment", auth, EquipmentController.store);
routes.put("/equipment/:id", auth, EquipmentController.update);
routes.delete("/equipment/:id", auth, EquipmentController.destroy);

// Maintenance
routes.get("/maintenance", auth, MaintenanceController.index);
routes.get("/maintenance/:id", auth, MaintenanceController.show);
routes.post("/maintenance", auth, MaintenanceController.store);
routes.put("/maintenance/:id", auth, MaintenanceController.update);
routes.delete("/maintenance/:id", auth, MaintenanceController.destroy);

// Adress
routes.post("/adress", auth, AdressController.store);
routes.get("/adress", auth, AdressController.index);
routes.get("/adress/:id", auth, AdressController.show);
routes.put("/adress/:id", auth, AdressController.update);
routes.delete("/adress/:id", auth, AdressController.destroy);

module.exports = routes;
