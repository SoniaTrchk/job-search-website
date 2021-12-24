const express = require("express");
const employerController = require("../сontrollers/employerController");

const employerRouter = express.Router();

employerRouter.get("/resumes", employerController.resumesPage);
employerRouter.get("/my_page", employerController.profileEmployer);
employerRouter.post("/add_contract/:id", employerController.createContract);
employerRouter.get("/edit_contract/:id", employerController.editContractPage);
employerRouter.post("/edit_contract/:id", employerController.editContract);
employerRouter.post("/delete_contract/:id", employerController.deleteContract);
employerRouter.get("/logout", employerController.logout);

module.exports = employerRouter;
