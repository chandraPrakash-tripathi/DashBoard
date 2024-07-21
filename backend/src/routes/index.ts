import express from "express";
import EmployeeController from "../controllers/EmployeeController";

const router = express.Router();
router.post('/signup', EmployeeController.signup);
router.post('/login', EmployeeController.login);
router.get("/employee", EmployeeController.getAllEmployee);
router.get('/employee/:id', EmployeeController.getEmployee);
router.post("/employee", EmployeeController.createEmployee);
router.put("/employee/:id", EmployeeController.updateEmployee);
router.delete("/employee/:id", EmployeeController.deleteEmployee);
router.get('/employees/search', EmployeeController.searchEmployeesByName);


export default router;