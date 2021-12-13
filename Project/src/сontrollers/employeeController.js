const Employee = require("../models/employee");
const Resume = require("../models/resume");


module.exports = {
    getEmployee: function (req, res) {
        Employee.get(req.con, function (err, rows) {
            console.log("hhh")
            res.render("profile", {clients: rows[0]})
        })
    },
    registrationEmployeePage: function (req, res) {
        res.render("registration")
    },
    registrationEmployee: function (req, res) {
        Employee.createEmployee(req.con, req.body, function (err) {
            res.redirect("/employee/login")
        })
    },
    loginEmployeePage: function (req, res) {
        res.render("login")
    },
    loginEmployee: function (req, res) {
        Employee.checkEmployee(req.con, req.body, function (err, result) {
            if (result.length !== 0) {
                res.cookie('idEmployee', result[0].client_id, {path: "/employee", signed: true})
                res.redirect("/employee/my_page")
            } else {
                res.redirect("/employee/login")
            }
        })
    },
    createResumePage: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        if (id == null) {
            res.redirect("/employee/login")
        } else {
            res.render("addResume")
        }
    },
    createResume: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        Resume.createResume(req.con, id, req.body, function (err) {
            res.redirect("/employee/my_page")
        })
    },
    profileEmployee: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        if (id == null) {
            res.redirect("/employee/login")
        } else {
            Resume.getAllResume(req.con, id, function (err, rows) {
                res.render("profileEmployee", {client: rows[0], resumes: rows})
            })
        }
    },
    editResumePage: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        if (id == null) {
            res.redirect("/employee/login")
        } else {
            const resume_id = req.params.id;
            Resume.getResume(req.con, resume_id, id, function (err, result) {
                res.render("editResume", {resume: result[0]})
            })
        }
    },
    editResume: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        const resume_id = req.params.id;
        Resume.updateResume(req.con, resume_id, id, req.body, function (err) {
            res.redirect("/employee/my_page")
        })
    },
    deleteResume: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        const resume_id = req.params.id;
        Resume.deleteResume(req.con, resume_id, req.body, function (err) {
            res.redirect("/employee/my_page")
        })
    },
    logout: function (req, res) {
        res.cookie('idEmployee', "", {path: "/employee", signed: true, maxAge: 0.001});
        res.redirect("/employee/login")
    }
}
