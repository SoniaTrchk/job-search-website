const Employee = require("../models/employee");
const Resume = require("../models/resume");
const Contract = require("../models/contract");

module.exports = {
  getEmployee(req, res) {
    Employee.get(req.con, (err, rows) => {
      console.log("hhh");
      res.render("profile", { clients: rows[0] });
    });
  },
  createResumePage(req, res) {
    const id = req.signedCookies.idEmployee;
    if (id == null) {
      res.redirect("/employee/login");
    } else {
      res.render("addResume");
    }
  },
  createResume(req, res) {
    const id = req.signedCookies.idEmployee;
    Resume.createResume(req.con, id, req.body, (err) => {
      res.redirect("/employee/my_page");
    });
  },
  profileEmployee(req, res) {
    const id = req.signedCookies.idEmployee;
    if (id == null) {
      res.redirect("/login");
    } else {
      Resume.getAllResume(req.con, id, (err, rows) => {
        Employee.getEmployee(req.con, id, (err, result) => {
          res.render("profileEmployee", { client: result[0], resumes: rows });
        });
      });
    }
  },
  editResumePage(req, res) {
    const id = req.signedCookies.idEmployee;
    if (id == null) {
      res.redirect("/login");
    } else {
      const resume_id = req.params.id;
      Resume.getResume(req.con, resume_id, (err, result) => {
        res.render("editResume", { resume: result[0] });
      });
    }
  },
  editResume(req, res) {
    const resume_id = req.params.id;
    Resume.updateResume(req.con, resume_id, req.body, (err) => {
      res.redirect("/employee/my_page");
    });
  },
  deleteResume(req, res) {
    const id = req.signedCookies.idEmployee;
    const resume_id = req.params.id;
    Resume.deleteResume(req.con, resume_id, (err) => {
      res.redirect("/employee/my_page");
    });
  },
  logout(req, res) {
    res.cookie('idEmployee', "", { path: "/employee", signed: true, maxAge: 0.001 });
    res.redirect("/login");
  },
  contractsPage(req, res) {
    const id = req.signedCookies.idEmployee;
    if (id == null) {
      res.redirect("/login");
    } else {
      Contract.getEmployeeContract(req.con, id, (err, rows) => {
        res.render("contractsList", { contracts: rows });
      });
    }
  },
};
