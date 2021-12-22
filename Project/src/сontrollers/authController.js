const Auth = require("../models/auth");

 module.exports = {
     loginPage: function (req, res) {
         res.render("login")
     },
     login: function (req, res) {
         Auth.checkClient(req.con, req.body, function (err, result) {
             if (result.length !== 0) {
                 if (result[0].role === "employee") {
                     res.cookie('idEmployee', result[0].client_id, {path: "/employee", signed: true})
                     res.redirect("/employee/my_page")
                 } else {
                     res.cookie('idEmployer', result[0].client_id, {path: "/employer", signed: true})
                     res.redirect("/employer/my_page")
                 }

             } else {
                 res.redirect("/login")
             }
         })
     },
     registrationPage: function (req, res) {
         res.render("registration")
     },
     registration: function (req, res) {
         if(req.body.gender === "Female") {
             req.body.gender = "F";
         } else {
             req.body.gender = "M"
         }
         Auth.createClient(req.con, req.body, function (err) {
             res.redirect("/login")
         })
     }
 }