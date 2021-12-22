

module.exports = {
    createContract: function (con, id, resume, callback) {
        con.query(
            `INSERT INTO contract SET position = ?, salary = ?, employee_id = ?, employer_id = ?`, [resume.position,
                resume.salary, resume.employee_id, id],
            callback
        )
    },
    getEmployerContract: function (con, id, callback) {
        con.query(
            `SELECT * FROM contract con JOIN client cl on con.employee_id = cl.client_id WHERE employer_id = ?`, [id],
            callback
        )
    },
    getContract: function (con,contract_id, id, callback){
        con.query(
            `SELECT * FROM contract WHERE contract_id = ? and employer_id = ?`, [contract_id, id],
            callback
        )
    },
    updateContract: function (con, contract_id, data, callback) {
        con.query(
            `UPDATE contract SET position = ?, salary = ? WHERE contract_id = ?`, [data.position,
                data.salary, contract_id],
            callback
        )
    },
    deleteContract: function (con,contract_id, data, callback) {
        con.query(
            `DELETE FROM contract  WHERE  contract_id = ?`, [contract_id],
            callback
        )
    },
    getEmployeeContract : function (con, id, callback) {
        con.query(
            `SELECT * FROM contract con JOIN client cl on con.employer_id = cl.client_id WHERE employee_id = ?`, [id],
            callback
        )
    }
}