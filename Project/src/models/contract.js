

module.exports = {
    createContract: function (con,id, resume, callback) {
        con.query(
            `INSERT INTO contract SET position = ?, salary = ?, employee_id = ?, employer_id = ?`, [resume.position,
                resume.salary, resume.employee_id, id],
            callback
        )
    },
    getAllContract: function (con,data, callback) {
        con.query(
            `SELECT * FROM contract con JOIN client cl on contr.employer_id = c.client_id WHERE employer_id = ?`, [data],
            callback
        )
    },
    getContract: function (con,contract_id, id, callback){
        con.query(
            `SELECT * FROM contract WHERE contract_id = ? and employer_id = ?`, [contract_id, id],
            callback
        )
    },
    updateContract: function (con, contract_id, id, data, callback) {
        con.query(
            `UPDATE contract SET position = ?, salary = ? WHERE employer_id = ? AND contract_id = ?`, [data.position,
                data.salary, id, contract_id],
            callback
        )
    },
    deleteContract: function (con,contract_id, data, callback) {
        con.query(
            `DELETE FROM contract  WHERE  contract_id = ?`, [contract_id],
            callback
        )
    }
}