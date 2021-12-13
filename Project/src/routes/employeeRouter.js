const express = require("express")
const employeeController = require("../сontrollers/employeeController")
const employeeRouter = express.Router()

employeeRouter.get("", employeeController.getEmployee);
employeeRouter.get("/register", employeeController.registrationEmployeePage);
employeeRouter.post("/register", employeeController.registrationEmployee);
employeeRouter.get("/login", employeeController.loginEmployeePage);
employeeRouter.post("/login", employeeController.loginEmployee);
employeeRouter.get("/my_page", employeeController.profileEmployee);
employeeRouter.get("/add_resume", employeeController.createResumePage);
employeeRouter.post("/add_resume", employeeController.createResume);
employeeRouter.get("/edit_resume/:id", employeeController.editResumePage);
employeeRouter.post("/edit_resume/:id", employeeController.editResume);
employeeRouter.post("/delete_resume/:id", employeeController.deleteResume);
employeeRouter.get("/logout", employeeController.logout);


module.exports = employeeRouter;