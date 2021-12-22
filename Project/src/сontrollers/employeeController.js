const Employee = require("../models/employee");
const Resume = require("../models/resume");
const Contract = require("../models/contract");


module.exports = {
    getEmployee: function (req, res) {
        Employee.get(req.con, function (err, rows) {
            console.log("hhh")
            res.render("profile", {clients: rows[0]})
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
            res.redirect("/login")
        } else {
            Resume.getAllResume(req.con, id, function (err, rows) {
                Employee.getEmployee(req.con, id, function (err, result) {
                    res.render("profileEmployee", {client: result[0], resumes: rows})
                })
            })
        }
    },
    editResumePage: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        if (id == null) {
            res.redirect("/login")
        } else {
            const resume_id = req.params.id;
            Resume.getResume(req.con, resume_id, function (err, result) {
                res.render("editResume", {resume: result[0]})
            })
        }
    },
    editResume: function (req, res) {
        const resume_id = req.params.id;
        Resume.updateResume(req.con, resume_id, req.body, function (err) {
            res.redirect("/employee/my_page")
        })
    }
    ,
    deleteResume: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        const resume_id = req.params.id;
        Resume.deleteResume(req.con, resume_id, function (err) {
            res.redirect("/employee/my_page")
        })
    }
    ,
    logout: function (req, res) {
        res.cookie('idEmployee', "", {path: "/employee", signed: true, maxAge: 0.001});
        res.redirect("/login")
    },
    contractsPage: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        if (id == null) {
            res.redirect("/login")
        } else {
            Contract.getEmployeeContract(req.con, id, function (err, rows) {
                res.render("contractsList", {contracts: rows})
            })
        }
    }
}
