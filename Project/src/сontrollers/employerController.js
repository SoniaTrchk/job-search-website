const Employer = require('../models/employer');
const Contract = require('../models/contract');
const Resume = require('../models/resume');

module.exports = {
  resumesPage(req, res) {
    const id = req.signedCookies.idEmployer;
    if (id == null) {
      res.redirect("/login");
    } else {
      Resume.listOfResumes(req.con, (err, rows) => {
        res.render("resumeList", { resumes: rows });
      });
    }
  },
  getEmployer(req, res) {
    Employer.get(req.con, (err, rows) => {
      res.render("emp_profile", { clients: rows[0] });
    });
  },
  createContract(req, res) {
    const id = req.signedCookies.idEmployer;
    const resume_id = req.params.id;
    Resume.getResume(req.con, resume_id, (err, result) => {
      Contract.createContract(req.con, id, result[0], (err) => {
        Resume.deleteResume(req.con, resume_id, (err) => {
          res.redirect("/employer/my_page");
        });
      });
    });
  },
  profileEmployer(req, res) {
    const id = req.signedCookies.idEmployer;
    if (id == null) {
      res.redirect("/employer/login");
    } else {
      Contract.getEmployerContract(req.con, id, (err, rows) => {
        Employer.getEmployer(req.con, id, (err, result) => {
          res.render("profEmployer", { client: result[0], contracts: rows });
        });
      });
    }
  },
  editContractPage(req, res) {
    const id = req.signedCookies.idEmployer;
    if (id == null) {
      res.redirect("/login");
    } else {
      const contract_id = req.params.id;
      Contract.getContract(req.con, contract_id, id, (err, result) => {
        res.render("editContract", { contract: result[0] });
      });
    }
  },
  editContract(req, res) {
    const contract_id = req.params.id;
    Contract.updateContract(req.con, contract_id, req.body, (err) => {
      res.redirect("/employer/my_page");
    });
  },
  deleteContract(req, res) {
    const contract_id = req.params.id;
    Contract.deleteContract(req.con, contract_id, req.body, (err) => {
      res.redirect("/employer/my_page");
    });
  },

  logout(req, res) {
    res.cookie('idEmployer', "", { path: '/employer', signed: true, maxAge: 0.001 });
    res.redirect('/login');
  },
};
