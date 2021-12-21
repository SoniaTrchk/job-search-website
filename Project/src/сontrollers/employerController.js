const Employer = require("../models/employer");
const Contract = require("../models/contract");
const Resume = require("Project/src/models/resume")


module.exports = {
    getAllResumes: function (req,res){
        Resume.listOfResumes(req.con, id, function (err, rows) {
            res.render("ResumeList", {client: rows[0], resumes: rows})
        })
    },
    getEmployer: function (req, res) {
        Employer.get(req.con, function (err, rows) {
            res.render("emp_profile", {clients: rows[0]})
        })
    },
    registrationEmployerPage: function (req, res) {
        res.render("emp_registration")
    },
    registrationEmployer: function (req, res) {
        Employer.createEmployer(req.con, req.body, function (err) {
            res.redirect("/employer/login")
        })
    },
    loginEmployerPage: function (req, res) {
        res.render("emp_login")
    },
    loginEmployer: function (req, res) {
        Employer.checkEmployer(req.con, req.body, function (err, result) {
            if (result.length !== 0) {
                res.cookie('idEmployer', result[0].client_id, {path: "/employer", signed: true})
                res.redirect("/employer/my_page")
            } else {
                res.redirect("/employer/login")
            }
        })
    },
    createContractPage: function (req, res) {
         let id = req.signedCookies['idEmployer'];
         if (id == null) {
             res.redirect("/employer/login")
         } else {
             res.render("addContract")
         }
     },
    createContract: function (req, res) {
         let id = req.signedCookies['idEmployer'];
         const resume = req.params.id;
         Contract.createContract(req.con, id, resume, function (err) {
            res.redirect("/employer/my_page")
         })
    },
    profileEmployer: function (req, res) {
        let id = req.signedCookies['idEmployer'];
        if (id == null) {
            res.redirect("/employer/login")
        } else {
            Contract.getAllContract(req.con, id, function (err, rows) {
                res.render("profileEmployer", {client: rows[0], contract: rows})
            })
        }
    },
    editContractPage: function (req, res) {
        let id = req.signedCookies['idEmployer'];
        if (id == null) {
            res.redirect("/employer/login")
        } else {
            const contract_id = req.params.id;
            Contract.getContract(req.con, contract_id, id, function (err, result) {
                res.render("editContract", {contract: result[0]})
            })
        }
    },
    editContract: function (req, res) {
        let id = req.signedCookies['idEmployee'];
        const contract_id = req.params.id;
        Contract.updateContract(req.con, contract_id, id, req.body, function (err) {
            res.redirect("/employer/my_page")
        })
    },
    deleteContract: function (req, res) {
        let id = req.signedCookies['idEmployer'];
        const contract_id = req.params.id;
        Contract.deleteContract(req.con, contract_id, req.body, function (err) {
            res.redirect("/employer/my_page")
        })
    },
    logout: function (req, res) {
        res.cookie('idEmployer', "", {path: "/employer", signed: true, maxAge: 0.001});
        res.redirect("/employer/login")
    }
}
