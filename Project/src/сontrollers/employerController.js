const Employer = require("../models/employer");
const Contract = require("../models/contract");
const Resume = require("../models/resume")


module.exports = {
    resumesPage: function (req, res) {
        let id = req.signedCookies['idEmployer'];
        if (id == null) {
            res.redirect("/login")
        } else {
            Resume.listOfResumes(req.con, function (err, rows) {
                res.render("resumeList", {resumes: rows})
            })
        }
    },
    getEmployer: function (req, res) {
        Employer.get(req.con, function (err, rows) {
            res.render("emp_profile", {clients: rows[0]})
        })
    },
    createContract: function (req, res) {
        let id = req.signedCookies['idEmployer'];
        const resume_id = req.params.id;
        Resume.getResume(req.con, resume_id, function (err, result) {
            Contract.createContract(req.con, id, result[0], function (err) {
                Resume.deleteResume(req.con, resume_id, function (err) {
                    res.redirect("/employer/my_page")
                })
            })
        })
    },
    profileEmployer: function (req, res) {
        let id = req.signedCookies['idEmployer'];
        if (id == null) {
            res.redirect("/employer/login")
        } else {
            Contract.getEmployerContract(req.con, id, function (err, rows) {
                Employer.getEmployer(req.con, id, function (err, result) {
                    res.render("profEmployer", {client: result[0], contracts: rows})
                })
            })
        }
    },
    editContractPage: function (req, res) {
        let id = req.signedCookies['idEmployer'];
        if (id == null) {
            res.redirect("/login")
        } else {
            const contract_id = req.params.id;
            Contract.getContract(req.con, contract_id, id, function (err, result) {
                res.render("editContract", {contract: result[0]})
            })
        }
    },
    editContract: function (req, res) {
        const contract_id = req.params.id;
        Contract.updateContract(req.con, contract_id, req.body, function (err) {
            res.redirect("/employer/my_page")
        })
    }
    ,
    deleteContract: function (req, res) {
        const contract_id = req.params.id;
        Contract.deleteContract(req.con, contract_id, req.body, function (err) {
            res.redirect("/employer/my_page")
        })
    }

    ,
    logout: function (req, res) {
        res.cookie('idEmployer', "", {path: "/employer", signed: true, maxAge: 0.001});
        res.redirect("/login")
    }
}
