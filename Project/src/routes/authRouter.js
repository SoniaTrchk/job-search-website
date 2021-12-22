const express = require("express")
const authController = require("../сontrollers/authController")
const authRouter = express.Router()

authRouter.get("/login", authController.loginPage)
authRouter.post("/login", authController.login)
authRouter.get("/register", authController.registrationPage)
authRouter.post("/register", authController.registration)



module.exports = authRouter;