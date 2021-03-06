const express = require("express");
const auth = require("./app/middlewares/auth");
const UserController = require("./app/controllers/UserController");
const AdressController = require("./app/controllers/AdressController");
const AuthController = require("./app/controllers/AuthController");
const CompanyController = require("./app/controllers/CompanyController");
const EquipmentController = require("./app/controllers/EquipmentController");
const MaintenanceController = require("./app/controllers/MaintenanceController");
const MeasurementController = require("./app/controllers/MeasurementController");
const DoorOpeningController = require("./app/controllers/DoorOpeningController");
const NotificationController = require("./app/controllers/NotificationController");
const CompanySpectrumController = require("./app/controllers/CompanySpectrumController");

const routes = express.Router();

// User
routes.get("/user", auth, UserController.index);
routes.get("/user/:id", auth, UserController.show);
routes.post("/user", UserController.store);
routes.put("/user/:id", auth, UserController.update);
routes.delete("/user/:id", auth, UserController.destroy);

// Auth
routes.post("/login", AuthController.login);
routes.post("/select-company", auth, AuthController.selectCompany);

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

// Measurements
routes.get("/measurement", auth, MeasurementController.index);
routes.get("/measurement/:id", auth, MeasurementController.show);
routes.post("/measurement", MeasurementController.store);
routes.put("/measurement/:id", auth, MeasurementController.update);
routes.delete("/measurement/:id",auth, MeasurementController.destroy);

// Door Opening
routes.get("/door-opening", DoorOpeningController.index);
routes.get("/door-opening/:id", DoorOpeningController.show);
routes.post("/door-opening", DoorOpeningController.store);
routes.put("/door-opening/:id", DoorOpeningController.update);
routes.delete("/door-opening/:id", DoorOpeningController.destroy);

// Notification
routes.get("/notification", auth, NotificationController.index);
routes.post("/notification", NotificationController.store);

// Company Spectrum
routes.get("/company-spectrum", auth, CompanySpectrumController.index);
routes.get("/company-spectrum/:id", auth, CompanySpectrumController.show);
routes.post("/company-spectrum", auth, CompanySpectrumController.store);
routes.put("/company-spectrum/:id", auth, CompanySpectrumController.update);
routes.delete("/company-spectrum/:id", auth, CompanySpectrumController.destroy);

routes.get("*", function (req, res) {
    return res.status(200).json({ status: 404, error: "Route " + req.originalUrl + " doesn't exists." });
});

module.exports = routes;
