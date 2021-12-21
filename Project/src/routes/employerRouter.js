const express = require("express")
const employerController = require("../сontrollers/employerController")
const employerRouter = express.Router()

employerRouter.get("", employerController.getEmployer);
employerRouter.get("/resumes", employerController.resumesPage);
employerRouter.get("/resumes", employerController.getAllResumes);
employerRouter.get("/register", employerController.registrationEmployerPage);
employerRouter.post("/register", employerController.registrationEmployer);
employerRouter.get("/login", employerController.loginEmployerPage);
employerRouter.post("/login", employerController.loginEmployer);
employerRouter.get("/my_page", employerController.profileEmployer);
employerRouter.get("/add_contract", employerController.createContractPage);
employerRouter.post("/add_contract", employerController.createContract);
employerRouter.get("/edit_contract/:id", employerController.editContractPage);
employerRouter.post("/edit_contract/:id", employerController.editContract);
employerRouter.post("/delete_contract/:id", employerController.deleteContract);
employerRouter.get("/all_resumes", employerController.getAllResumes)
employerRouter.get("/logout", employerController.logout);


module.exports = employerRouter;